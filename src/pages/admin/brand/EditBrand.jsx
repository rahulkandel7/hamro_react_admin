import { mixed, number, object, string } from "yup";
import { Formik } from "formik";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import { toast } from "react-toastify";

function EditBrand() {
  const brandSchema = object({
    brand_name: string().required("Brand Name is required"),
  });
  const params = useParams();
  const navigate = useNavigate();

  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, error } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/brand/${params.id}`,
    fetcher
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!error && !data) {
    return <h1>Loading</h1>;
  }
  if (data) {
    return (
      <>
        <AdminLayout>
          <div className="px-10 py-6 w-full bg-gray-100 h-full">
            <div className=" w-full ">
              <h1 className="text-gray-500 text-xl my-2">Edit Brand</h1>

              <hr />
              <Formik
                initialValues={{
                  brand_name: data.data.brand_name,
                }}
                validateOnChange={false}
                validationSchema={brandSchema}
                onSubmit={async (values) => {
                  const response = await fetch(
                    `https://api.hamroelectronics.com.np/api/v1/brand/${data.data.id}`,
                    {
                      method: "PUT",
                      body: JSON.stringify(values),
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  response.json().then((data) => {
                    if (data.status) {
                      toast(data.message, {
                        type: "success",
                      });
                      navigate("/admin/brand");
                    }
                  });
                }}
              >
                {({
                  errors,
                  handleChange,
                  handleSubmit,
                  values,
                  setFieldValue,
                }) => {
                  return (
                    <form onSubmit={handleSubmit} className="my-4">
                      <label
                        htmlFor="brand_name"
                        className="my-2 text-gray-500"
                      >
                        Brand Name
                      </label>
                      <input
                        type="text"
                        name="brand_name"
                        id="brand_name"
                        onChange={handleChange}
                        value={values.brand_name}
                        className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
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
                            Update Brand
                          </button>
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default EditBrand;
