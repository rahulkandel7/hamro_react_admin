import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { string, object, number } from "yup";

import AdminLayout from "../../../components/admin/AdminLayout";
import AddButton from "../../../components/utils/AddButton";
import useSWR from "swr";
import { toast } from "react-toastify";

function AddSubCategory() {
  const subCategorySchema = object({
    subcategory_name: string().required("Sub Category Name is required"),
    priority: string().required("Priority is required"),
    category_id: number().required("Please Choose Category"),
  });

  const params = useParams();

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  //* For Fetching Category
  const { data: categoryData, error: categoryError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/category",
    fetcher
  );

  //? Navigator
  const navigate = useNavigate();
  return (
    <>
      <AdminLayout>
        <div className="py-10 px-6 w-full">
          <div className="flex justify-between">
            <h1 className="text-4xl text-gray-700">Add Sub Category</h1>
            <NavLink to="/admin/subcategory">
              <AddButton name="Go Back" />
            </NavLink>
          </div>
          <hr className="my-2" />

          <Formik
            initialValues={{
              subcategory_name: "",
              priority: "",
              category_id: "",
            }}
            validateOnChange={false}
            validationSchema={subCategorySchema}
            onSubmit={(values) => {
              fetch("https://api.hamroelectronics.com.np/api/v1/subcategory", {
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
                    navigate("/admin/subcategory");
                  }
                });
              });
            }}
          >
            {({ errors, handleChange, handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit} className="my-5">
                  <div>
                    <label
                      htmlFor="category_name"
                      className="my-2 text-gray-500"
                    >
                      Sub Category Name
                    </label>
                    <input
                      type="text"
                      name="subcategory_name"
                      id="subcategory_name"
                      placeholder="Enter Sub Category Name"
                      onChange={handleChange}
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">
                      {errors.subcategory_name}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="priority" className="my-2 text-gray-500">
                      Sub Category Priority
                    </label>
                    <input
                      type="text"
                      name="priority"
                      id="priority"
                      placeholder="Enter Sub Category Priority"
                      onChange={handleChange}
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">
                      {errors.priority}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="category_id"
                      className="my-2 text-gray-500 block w-full"
                    >
                      Select Category
                    </label>
                    <select
                      name="category_id"
                      id="category_id"
                      onChange={handleChange}
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    >
                      <option disabled selected>
                        -- Select Category --
                      </option>
                      {categoryError ? (
                        <option>Error While Loading Category</option>
                      ) : categoryData ? (
                        categoryData.data.map((category) => {
                          return (
                            <option value={category.id} key={category.id} selected={params.id == category.id ? true : false}>
                              {category.category_name}
                            </option>
                          );
                        })
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>

                    <p className="text-sm text-red-500 pb-3">
                      {errors.category_id}
                    </p>
                  </div>

                  <div className="flex justify-end my-2">
                    <div>
                      <button
                        className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                        onClick={() => navigate("/admin/subcategory")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                      >
                        Add Sub Category
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

export default AddSubCategory;
