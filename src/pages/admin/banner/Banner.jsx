import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";

function Banner() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/banner",
    fetcher
  );

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

  async function deleteBanner(id) {
    const category = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/banner/${id}`,
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
    const priorityBanner = [...data.data].sort(
      (a, b) => a.priority - b.priority
    );
    return (
      <>
        <AdminLayout>
          {isDelete ? (
            <ShowDelete
              delete={deleteBanner}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}

          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Banners</h1>

              <NavLink to="create">
                <AddButton name="Add Banner" />
              </NavLink>
            </div>
            <hr className="my-2" />

            <div>
              <table className="w-full  rounded-lg shadow-xl px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 shadow-inner text-white">
                    <td className="py-2 px-5 ">Order</td>
                    <td className="py-2 px-5 ">Banner Photo</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {priorityBanner.map((banner) => {
                    return (
                      <tr key={banner.id}>
                        <td className="py-2 px-5 text-gray-600">
                          {banner.priority}
                        </td>

                        <td className="py-2 px-5 text-gray-600">
                          <img
                            src={`https://api.hamroelectronics.com.np/public/${banner.photopath}`}
                            alt=""
                            className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                          />
                        </td>

                        <td className="py-2 px-5 text-gray-600">
                          <NavLink to={`edit/${banner.id}`}>
                            <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                              Update Banner
                            </button>
                          </NavLink>
                          <button
                            className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                            onClick={() => {
                              toggleIsDelete();
                              setId(banner.id);
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
            <div></div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default Banner;
