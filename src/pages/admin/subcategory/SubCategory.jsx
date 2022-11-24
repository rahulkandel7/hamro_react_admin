import { useState } from "react";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import AddButton from "../../../components/utils/AddButton";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import { toast } from "react-toastify";

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
    return <h1>Error</h1>;
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
              <div className="flex justify-end items-center my-3">
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="border border-gray-200 pl-2 outline-none focus-visible:border-indigo-600 pr-6 text-gray-500 rounded-md shadow-md py-1"
                    placeholder="Search Sub Category..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <div className="absolute top-[50%] -translate-y-[50%] right-2 text-gray-500">
                    <i className="ri-search-2-line"></i>
                  </div>
                </div>
              </div>

              <div>
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

                              <td className="py-2 px-5 text-gray-600">
                                <NavLink to={`edit/${subCategory.id}`}>
                                  <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                                    Update Category
                                  </button>
                                </NavLink>
                                <button
                                  className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                  onClick={() => {
                                    toggleIsDelete();
                                    setId(subCategory.id);
                                  }}
                                >
                                  Delete
                                </button>
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

                                <td className="py-2 px-5 text-gray-600">
                                  <NavLink to={`edit/${dat.id}`}>
                                    <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                                      Update Category
                                    </button>
                                  </NavLink>
                                  <button
                                    className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                    onClick={() => {
                                      toggleIsDelete;
                                      setId(dat.id);
                                    }}
                                  >
                                    Delete
                                  </button>
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
