import { useState } from "react";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import AddButton from "../../../components/utils/AddButton";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import { toast } from "react-toastify";
import SearchBox from "../../../components/utils/SearchBox";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";
import EditButton from "../../../components/utils/buttons/EditButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";

function SubCategory() {
  //* For Fetching Sub Category Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const { data, error, mutate } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/subcategory",
    fetcher
  );

  //? for Search
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState(0);
  //? For Delete
  function toggleIsDelete() {
    setIsDelete(!isDelete);
  }

  async function deleteSubCategory(id) {
    const sub = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/subcategory/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    sub.json().then((data) => {
      toast(data.message, {
        type: "success",
      });
    });

    mutate();
    toggleIsDelete();
  }

  if (error) {
    return <ServerError />;
  }

  if (!data && !error) {
    return <Spinner />;
  }

  if (data) {
    const orderSubcategory = [...data.data].sort(
      (a, b) => a.priority - b.priority
    );
    return (
      <>
        <AdminLayout>
          {isDelete ? (
            <ShowDelete
              delete={deleteSubCategory}
              id={id}
              hideDelete={toggleIsDelete}
            />
          ) : (
            <></>
          )}
          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Sub Categories</h1>
              <NavLink to="create">
                <AddButton name="Add Sub Category" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <div>
              <SearchBox
                name="Sub Category"
                change={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <div className="overflow-scroll">
                <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                  <thead className="bg-gray-500 ">
                    <tr className="w-full border border-gray-100 text-white">
                      <td className="py-2 px-5 ">Order</td>
                      <td className="py-2 px-5 ">Sub Category Name</td>
                      <td className="py-2 px-5 ">Category Name</td>
                      <td className="py-2 px-5 ">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {search === ""
                      ? orderSubcategory.map((subCategory) => {
                          return (
                            <tr key={subCategory.id}>
                              <td className="py-2 px-5 text-gray-600">
                                {subCategory.priority}
                              </td>
                              <td className="py-2 px-5 text-gray-600">
                                {subCategory.subcategory_name}
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                {subCategory.category_name}
                              </td>

                              <td className="py-2 px-5 flex items-center justify-center text-gray-600">
                                <NavLink to={`edit/${subCategory.id}`}>
                                  <EditButton />
                                </NavLink>
                                <DeleteButton
                                  click={() => {
                                    toggleIsDelete();
                                    setId(subCategory.id);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })
                      : data.data
                          .filter((subCategory) => {
                            if (search === "") {
                              return subCategory;
                            } else if (
                              subCategory.subcategory_name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return subCategory;
                            }
                          })
                          .map((dat) => {
                            return (
                              <tr key={dat.id}>
                                <td className="py-2 px-5 text-gray-600">
                                  {dat.priority}
                                </td>
                                <td className="py-2 px-5 text-gray-600">
                                  {dat.subcategory_name}
                                </td>

                                <td className="py-2 px-5 flex items-center justify-center text-gray-600">
                                  <NavLink to={`edit/${dat.id}`}>
                                    <EditButton />
                                  </NavLink>
                                  <DeleteButton
                                    click={() => {
                                      toggleIsDelete();
                                      setId(dat.id);
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default SubCategory;
