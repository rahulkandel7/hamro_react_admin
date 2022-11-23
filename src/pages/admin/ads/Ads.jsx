import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";

function Ads() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/ad",
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

  async function deleteAds(id) {
    const ads = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/ad/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    ads.json().then((data) => {
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
    return <>{error}</>;
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
              delete={deleteAds}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}

          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Ads</h1>

              <NavLink to="create">
                <AddButton name="Add Ads" />
              </NavLink>
            </div>
            <hr className="my-2" />

            <div>
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">Ad Code</td>
                    <td className="py-2 px-5 ">Ad Description</td>
                    <td className="py-2 px-5 ">Ad Photo</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((ads) => {
                    return (
                      <tr key={ads.id}>
                        <td className="py-2 px-5 text-gray-600">
                          {ads.ad_code}
                        </td>
                        <td className="py-2 px-5 text-gray-600">
                          {ads.ad_description}
                        </td>

                        <td className="py-2 px-5 text-gray-600">
                          <img
                            src={`https://api.hamroelectronics.com.np/public/${ads.photopath}`}
                            alt=""
                            className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                          />
                        </td>

                        <td className="py-2 px-5 text-gray-600">
                          <NavLink to={`edit/${ads.id}`}>
                            <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                              Update Ads
                            </button>
                          </NavLink>
                          <button
                            className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                            onClick={() => {
                              toggleIsDelete();
                              setId(ads.id);
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

export default Ads;
