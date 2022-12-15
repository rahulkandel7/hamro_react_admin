import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { RiRecycleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import EditButton from "../../../components/utils/buttons/EditButton";
import SearchBox from "../../../components/utils/SearchBox";
import ServerError from "../../500";

function Notification() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/notification",
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

  async function deleteNotification(id) {
    const category = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/notification/${id}`,
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

  function resend(id) {
    fetch(`https://api.hamroelectronics.com.np/api/v1/notification/resend/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast(data.message, {
          type: "success",
        });
      });
  }

  if (error) {
    return <ServerError />;
  }

  if (!error && !data) {
    return <AdminLayout loading={true} />;
  }

  if (data) {
    return (
      <>
        <AdminLayout>
          {isDelete ? (
            <ShowDelete
              delete={deleteNotification}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}
          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Notifications</h1>
              <NavLink to="create">
                <AddButton name="Add Notification" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <SearchBox
              name="Notification"
              change={(e) => {
                setSearch(e.target.value);
              }}
            />

            <div className="overflow-scroll">
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">S.No</td>
                    <td className="py-2 px-5 ">Title</td>
                    <td className="py-2 px-5 ">Description</td>
                    <td className="py-2 px-5 ">Date</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {search === ""
                    ? data.data.map((notification, index) => {
                      return (
                        <tr key={notification.id} className="border border-gray-200">
                          <td className="py-2 px-5 text-gray-600">
                            {index + 1}
                          </td>
                          <td className="py-2 px-5 text-gray-600">
                            {notification.title}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {notification.description}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {notification.created_at}
                          </td>


                          <td className="py-2 px-5 text-gray-600 flex items-center justify-center">
                            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-800 text-white rounded-md shadow-md" onClick={() => resend(notification.id)}>
                              <FiSend />
                            </button>
                            <NavLink to={`edit/${notification.id}`}>
                              <EditButton />
                            </NavLink>
                            <DeleteButton
                              click={() => {
                                toggleIsDelete();
                                setId(notification.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                    : data.data
                      .filter((notification) => {
                        if (search === "") {
                          return notification;
                        } else if (
                          notification.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return notification;
                        }
                      })
                      .map((notification, index) => {
                        return (
                          <tr key={notification.id} className="border border-gray-200">
                            <td className="py-2 px-5 text-gray-600">
                              {index + 1}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {notification.title}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {notification.description}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {notification.created_at}
                            </td>

                            <td className="py-2 flex items-center justify-center px-5 text-gray-600 ">
                              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-800 text-white rounded-md shadow-md" onClick={() => resend(notification.id)}>
                                <FiSend />
                              </button>
                              <NavLink to={`edit/${notification.id}`}>
                                <EditButton />
                              </NavLink>
                              <DeleteButton
                                click={() => {
                                  toggleIsDelete();
                                  setId(notification.id);
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
        </AdminLayout>
      </>
    );
  }
}

export default Notification;
