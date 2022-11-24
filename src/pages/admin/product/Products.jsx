import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";

function Category() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/product",
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
    fetch(`https://api.hamroelectronics.com.np/api/v1/product/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        toast(data.message, {
          type: "success",
        });
      });
    });

    mutate();
    toggleIsDelete();
  }

  const navigate = useNavigate();
  //! Show Error
  if (error) {
    navigate("/login");
  }

  //*Show Loading
  if (!data && !error) {
    return <h1>Loading</h1>;
  }

  //? Show Data when loaded
  if (data) {
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
              <h1 className="text-4xl text-gray-700">Products</h1>

              <NavLink to="create">
                <AddButton name="Add Product" />
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
                  placeholder="Search Category..."
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
                    <td className="py-2 px-5 ">SKU</td>
                    <td className="py-2 px-5 ">Product Name</td>
                    <td className="py-2 px-5 ">Product Image</td>
                    <td className="py-2 px-5 ">Category Name</td>
                    <td className="py-2 px-5 ">Product Price</td>
                    <td className="py-2 px-5 ">Product Stock</td>
                    <td className="py-2 px-5 ">Is Flash Sale </td>
                    <td className="py-2 px-5 ">Is Deleted</td>
                    <td className="py-2 px-5 ">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {search === ""
                    ? data.data.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td className="py-2 px-5 text-gray-600">
                              {product.sku}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {product.name}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              <img
                                src={`https://api.hamroelectronics.com.np/public/${product.photopath1}`}
                                alt=""
                                className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                              />
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {product.categoryName}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {product.price}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {product.stock}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {product.flashsale ? "Yes" : "No"}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {product.deleted ? "Yes" : "No"}
                            </td>

                            <td className="py-2 px-5 text-gray-600 flex">
                              <NavLink to={`edit/${product.id}`}>
                                <button
                                  className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2"
                                  title="edit"
                                >
                                  <i className="ri-edit-circle-line"></i>
                                </button>
                              </NavLink>

                              <NavLink to={`view/${product.id}`}>
                                <button
                                  className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-sky-500 hover:bg-sky-700 text-white mx-2"
                                  title="show"
                                >
                                  <i className="ri-eye-2-line"></i>
                                </button>
                              </NavLink>

                              <button
                                className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                title="delete"
                                onClick={() => {
                                  toggleIsDelete();
                                  setId(product.id);
                                }}
                              >
                                <i className="ri-delete-bin-4-line"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : data.data
                        .filter((product) => {
                          if (search === "") {
                            return product;
                          } else if (
                            product.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return product;
                          }
                        })
                        .map((dat) => {
                          return (
                            <tr key={dat.id}>
                              <td className="py-2 px-5 text-gray-600">
                                {dat.sku}
                              </td>
                              <td className="py-2 px-5 text-gray-600">
                                {dat.name}
                              </td>
                              <td className="py-2 px-5 text-gray-600">
                                <img
                                  src={`https://api.hamroelectronics.com.np/public/${dat.photopath1}`}
                                  alt=""
                                  className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                                />
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                {dat.category_id}
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                {dat.price}
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                {dat.stock}
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                {dat.flashsale == 1 ? "Yes" : "No"}
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                {dat.deleted == 0 ? "Yes" : "No"}
                              </td>

                              <td className="py-2 px-5 text-gray-600 flex">
                                <NavLink to={`edit/${dat.id}`}>
                                  <button
                                    className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2"
                                    title="edit"
                                  >
                                    <i className="ri-edit-circle-line"></i>
                                  </button>
                                </NavLink>

                                <NavLink to={`view/${dat.id}`}>
                                  <button
                                    className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-sky-500 hover:bg-sky-700 text-white mx-2"
                                    title="show"
                                  >
                                    <i className="ri-eye-2-line"></i>
                                  </button>
                                </NavLink>

                                <button
                                  className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                  title="delete"
                                  onClick={() => {
                                    toggleIsDelete();
                                    setId(dat.id);
                                  }}
                                >
                                  <i className="ri-delete-bin-4-line"></i>
                                </button>
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
