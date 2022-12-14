import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";

import { toast } from "react-toastify";
import AdminLayout from "../../../components/admin/AdminLayout";
import AddButton from "../../../components/utils/AddButton";

function EditNotification() {
  const notificationSchema = object({
    title: string().required("Notification Title is required"),
    description: string().required("Notification Description is required"),
  });

  const navigate = useNavigate();
  return (
    <>
      <AdminLayout>
        <div className="px-10 py-6 w-full">
          <div className="flex justify-between">
            <h1 className="text-4xl text-gray-700">Edit Notification</h1>
            <NavLink to="/admin/notification">
              <AddButton name="Go Back" />
            </NavLink>
          </div>
          <hr className="my-2" />
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={notificationSchema}
            validateOnChange={false}
            onSubmit={async (values) => {
              fetch("https://api.hamroelectronics.com.np/api/v1/notification", {
                method: "post",
                body: JSON.stringify(values),
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }).then((res) => {
                res.json().then((data) => {
                  if (data.status) {
                    toast(data.message, {
                      type: "success",
                    });
                    navigate("/admin/coupon");
                  }
                });
              });
            }}
          >
            {({ errors, handleChange, handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit} className="my-4">
                  <div>
                    <label htmlFor="title" className="my-2 text-gray-500">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={handleChange}
                      placeholder="Enter Notification Title"
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">{errors.name}</p>
                  </div>

                  <div>
                    <label htmlFor="description" className="my-2 text-gray-500">
                      Description
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      onChange={handleChange}
                      placeholder="Enter Notification Description"
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    ></textarea>
                    <p className="text-sm text-red-500 pb-3">{errors.name}</p>
                  </div>


                  <div className="flex justify-end my-2">
                    <div>
                      <button
                        className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                        onClick={() => navigate("/admin/notification")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                      >
                        Add Notification
                      </button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </AdminLayout>
    </>
  );
}

export default EditNotification;
