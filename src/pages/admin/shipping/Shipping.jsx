import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";

function Shipping() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/shipping",
    fetcher
  );
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

  async function deleteShipping(id) {
    const category = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/shipping/${id}`,
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
  if (data) {
    return (
      <>
        <AdminLayout>
          {isDelete ? (
            <ShowDelete
              delete={deleteShipping}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}
          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Shipping</h1>
              <NavLink to="create">
                <AddButton name="Add Shipping Area" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <div className="flex justify-end items-center my-3">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="border border-gray-200 pl-2 outline-none focus-visible:border-indigo-600 pr-6 text-gray-500 rounded-md shadow-md py-1"
                  placeholder="Search Shipping Area..."
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
                    <td className="py-2 px-5 ">S.No</td>
                    <td className="py-2 px-5 ">Shipping Area Name</td>
                    <td className="py-2 px-5 ">Shipping Area Cost</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {search === ""
                    ? data.data.map((shipping, index) => {
                        return (
                          <tr key={shipping.id}>
                            <td className="py-2 px-5 text-gray-600">
                              {index + 1}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {shipping.area_name}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              Rs {shipping.price}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              <NavLink to={`edit/${shipping.id}`}>
                                <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                                  Update Shipping Area
                                </button>
                              </NavLink>
                              <button
                                className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                onClick={() => {
                                  toggleIsDelete();
                                  setId(shipping.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : data.data
                        .filter((shipping) => {
                          if (search === "") {
                            return shipping;
                          } else if (
                            shipping.area_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return shipping;
                          }
                        })
                        .map((dat, index) => {
                          return (
                            <tr key={dat.id}>
                              <td className="py-2 px-5 text-gray-600">
                                {index + 1}
                              </td>
                              <td className="py-2 px-5 text-gray-600">
                                {dat.area_name}
                              </td>
                              <td className="py-2 px-5 text-gray-600">
                                Rs {dat.price}
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                <NavLink to={`edit/${dat.id}`}>
                                  <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                                    Update Shipping Area
                                  </button>
                                </NavLink>
                                <button
                                  className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                  onClick={() => {
                                    toggleIsDelete;
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
        </AdminLayout>
      </>
    );
  }
}

export default Shipping;
