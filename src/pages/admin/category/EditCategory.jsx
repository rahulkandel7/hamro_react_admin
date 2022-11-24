import { mixed, number, object, string } from "yup";
import { Formik } from "formik";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import { toast } from "react-toastify";

function EditCategory() {
  const categoryEditSchema = object({
    category_name: string().required("Category Name is Required"),
    priority: number().required("Priority is Required"),
    photopath: mixed().nullable(),
  });
  const params = useParams();
  const navigate = useNavigate();

  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, error } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/category/${params.id}`,
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
              <h1 className="text-gray-500 text-xl my-2">Edit Category</h1>

              <hr />
              <Formik
                initialValues={{
                  category_name: data.data.category_name,
                  priority: data.data.priority,
                }}
                validateOnChange={false}
                validationSchema={categoryEditSchema}
                onSubmit={async (values) => {
                  const formData = new FormData();
                  formData.append("category_name", values.category_name);
                  formData.append("priority", values.priority);
                  formData.append("_method", "put");
                  formData.append(
                    "photopath",
                    values.photopath !== null
                      ? values.photopath
                      : data.data.photopath
                  );

                  const response = await fetch(
                    `https://api.hamroelectronics.com.np/api/v1/category/${data.data.id}`,
                    {
                      method: "POST",
                      body: formData,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  response.json().then((data) => {
                    if (data.details) {
                      data.details.photopath.map((detail) => {
                        toast(detail, {
                          type: "error",
                        });
                      });
                    }
                    if (data.status) {
                      toast(data.message, {
                        type: "success",
                      });
                      navigate("/admin/category");
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
                        htmlFor="category_name"
                        className="my-2 text-gray-500"
                      >
                        Category Name
                      </label>
                      <input
                        type="text"
                        name="category_name"
                        id="category_name"
                        onChange={handleChange}
                        value={values.category_name}
                        className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                      />
                      <p className="text-sm text-red-500 pb-3">
                        {errors.category_name}
                      </p>

                      <label htmlFor="priority" className="my-2 text-gray-500">
                        Category Priority
                      </label>
                      <input
                        type="text"
                        name="priority"
                        id="priority"
                        onChange={handleChange}
                        value={values.priority}
                        className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                      />
                      <p className="text-sm text-red-500 pb-3">
                        {errors.priority}
                      </p>

                      <p className="my-2 text-gray-500 ">Select Photo</p>
                      <label
                        htmlFor="photopath"
                        className="my-2 text-gray-500 "
                      >
                        <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                          {values.photopath ? (
                            <img
                              src={URL.createObjectURL(values.photopath)}
                              className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1 object-cover"
                              alt=""
                            />
                          ) : (
                            <i className="text-6xl text-gray-300 ri-add-line "></i>
                          )}
                        </div>
                      </label>
                      <input
                        type="file"
                        hidden
                        name="photopath"
                        id="photopath"
                        onChange={(e) => {
                          setFieldValue("photopath", e.currentTarget.files[0]);
                        }}
                        className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                      />

                      <p className="text-sm text-red-500 pb-3">
                        {errors.photopath}
                      </p>
                      <div className="flex justify-end my-2">
                        <div>
                          <button
                            className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                            onClick={() => navigate("/admin/category")}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                          >
                            Update Category
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

export default EditCategory;
