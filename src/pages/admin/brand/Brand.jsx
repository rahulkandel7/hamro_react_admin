import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import EditButton from "../../../components/utils/buttons/EditButton";
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
    "https://api.hamroelectronics.com.np/api/v1/brand",
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
      `https://api.hamroelectronics.com.np/api/v1/brand/${id}`,
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
              <h1 className="text-4xl text-gray-700">Brands</h1>

              <NavLink to="create">
                <AddButton name="Add Brand" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <SearchBox
              name="Brand"
              change={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className="overflow-scroll">
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">S.No</td>
                    <td className="py-2 px-5 ">Brand Name</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {search === ""
                    ? data.data.map((brand, index) => {
                        return (
                          <tr key={brand.id}>
                            <td className="py-2 px-5 text-gray-600">
                              {index + 1}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {brand.brand_name}
                            </td>

                            <td className="py-2 flex items-center px-5 text-gray-600">
                              <NavLink to={`edit/${brand.id}`}>
                                <EditButton />
                              </NavLink>

                              <DeleteButton
                                click={() => {
                                  toggleIsDelete();
                                  setId(brand.id);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })
                    : data.data
                        .filter((brand) => {
                          if (search === "") {
                            return brand;
                          } else if (
                            brand.brand_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return brand;
                          }
                        })
                        .map((dat, index) => {
                          return (
                            <tr key={dat.id}>
                              <td className="py-2 px-5 text-gray-600">
                                {index + 1}
                              </td>
                              <td className="py-2 px-5 text-gray-600">
                                {dat.brand_name}
                              </td>

                              <td className="py-2   px-5 flex justify-center items-center text-gray-600">
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
