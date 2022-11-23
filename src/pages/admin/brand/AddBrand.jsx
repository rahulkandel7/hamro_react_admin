import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { string, object } from "yup";

import AdminLayout from "../../../components/admin/AdminLayout";
import AddButton from "../../../components/utils/AddButton";
import { toast } from "react-toastify";

function AddBrand() {
  const brandSchema = object({
    brand_name: string().required("Brand Name is required"),
  });

  const navigate = useNavigate();
  return (
    <>
      <AdminLayout>
        <div className="px-10 py-6 w-full">
          <div className="flex justify-between">
            <h1 className="text-4xl text-gray-700">Add Brand</h1>
            <NavLink to="/admin/brand">
              <AddButton name="Go Back" />
            </NavLink>
          </div>
          <hr className="my-2" />
          <Formik
            initialValues={{ brand_name: "" }}
            validationSchema={brandSchema}
            validateOnChange={false}
            onSubmit={async (values) => {
              fetch("https://api.hamroelectronics.com.np/api/v1/brand", {
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
                    navigate("/admin/brand");
                  }
                });
              });
            }}
          >
            {({ errors, handleChange, handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit} className="my-4">
                  <label htmlFor="brand_name" className="my-2 text-gray-500">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brand_name"
                    id="brand_name"
                    onChange={handleChange}
                    placeholder="Enter Brand Name"
                    className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                  />
                  <p className="text-sm text-red-500 pb-3">
                    {errors.brand_name}
                  </p>
                  <div className="flex justify-end my-2">
                    <div>
                      <button
                        className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                        onClick={() => navigate("/admin/brand")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                      >
                        Add Brand
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

export default AddBrand;
