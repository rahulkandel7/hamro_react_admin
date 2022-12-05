import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";
import EditButton from "../../../components/utils/buttons/EditButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";

import SearchBox from "../../../components/utils/SearchBox";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";

function Category() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/category",
    fetcher
  );

  //* For searching data
  const [search, setSearch] = useState("");

  //* For deleting data
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState();

  const toggleIsDelete = () => {
    if (isDelete) {
      setIsDelete(false);
    } else {
      setIsDelete(true);
    }
  };

  //* For Deleteing Category

  async function deleteCategory(id) {
    const category = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/category/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    category.json().then((data) => {
      toast(data.message, {
        type: "success",
      });
    });
    mutate();
    toggleIsDelete();
  }

  const navigate = useNavigate();
  //! Show Error
  if (error) {
    return <ServerError />;
  }

  //*Show Loading
  if (!data && !error) {
    return <Spinner />;
  }

  //? Show Data when loaded
  if (data) {
    const priorityCategory = [...data.data].sort(
      (a, b) => a.priority - b.priority
    );
    const categoryLength = priorityCategory.length;
    return (
      <>
        <AdminLayout>
          {isDelete ? (
            <ShowDelete
              delete={deleteCategory}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}

          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Categories</h1>

              <NavLink to="create" state={categoryLength}>
                <AddButton name="Add Category" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <SearchBox
              name="Category"
              change={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className="overflow-scroll">
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">Order</td>
                    <td className="py-2 px-5 ">Category Name</td>
                    <td className="py-2 px-5 ">Category Photo</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {search === ""
                    ? priorityCategory.map((category) => {
                      return (
                        <tr key={category.id} className="border border-gray-200">
                          <td className="py-2 px-5 text-gray-600">
                            {category.priority}
                          </td>
                          <td className="py-2 px-5 text-gray-600">
                            {category.category_name}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            <img
                              src={`https://api.hamroelectronics.com.np/public/${category.photopath}`}
                              alt=""
                              className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                            />
                          </td>

                          <td className="py-2 h-full px-5 flex items-center justify-center text-gray-600">
                            <NavLink to={`edit/${category.id}`}>
                              <EditButton />
                            </NavLink>

                            <DeleteButton
                              click={() => {
                                toggleIsDelete();
                                setId(category.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                    : data.data
                      .filter((category) => {
                        if (search === "") {
                          return category;
                        } else if (
                          category.category_name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return category;
                        }
                      })
                      .map((dat) => {
                        return (
                          <tr key={dat.id} className="border border-gray-200">
                            <td className="py-2 px-5 text-gray-600">
                              {dat.priority}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {dat.category_name}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              <img
                                src={`https://api.hamroelectronics.com.np/public/${dat.photopath}`}
                                alt=""
                                className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                              />
                            </td>

                            <td className="py-2 h-full px-5 flex items-center justify-center text-gray-600">
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
            <div></div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default Category;
