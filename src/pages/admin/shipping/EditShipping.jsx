import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { string, object, number } from "yup";

import AdminLayout from "../../../components/admin/AdminLayout";
import AddButton from "../../../components/utils/AddButton";
import { toast } from "react-toastify";
import useSWR from "swr";
import ServerError from "../../500";
import Spinner from "../../../components/utils/Spinner";

function EditShipping() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const params = useParams();
  const { data, error } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/shipping/${params.id}`,
    fetcher
  );

  const shippingSchema = object({
    area_name: string().required("Shipping Area Name is required"),
    price: number().required("Shipping Area Price is required"),
  });

  const navigate = useNavigate();

  if (error) {
    return <ServerError />;
  }

  if (!error && !data) {
    return <Spinner />;
  }

  if (data) {
    return (
      <>
        <AdminLayout>
          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Edit Shipping</h1>
              <NavLink to="/admin/shipping">
                <AddButton name="Go Back" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <Formik
              initialValues={{
                area_name: data.data.area_name,
                price: data.data.price,
              }}
              validationSchema={shippingSchema}
              validateOnChange={false}
              onSubmit={async (values) => {
                fetch(
                  `https://api.hamroelectronics.com.np/api/v1/shipping/${params.id}`,
                  {
                    method: "put",
                    body: JSON.stringify(values),
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      "Content-Type": "application/json",
                    },
                  }
                ).then((res) => {
                  res.json().then((data) => {
                    if (data.status) {
                      toast(data.message, {
                        type: "success",
                      });
                      navigate("/admin/shipping");
                    }
                  });
                });
              }}
            >
              {({ errors, handleChange, handleSubmit, values }) => {
                return (
                  <form onSubmit={handleSubmit} className="my-4">
                    <div>
                      <label htmlFor="area_name" className="my-2 text-gray-500">
                        Shipping Area Name
                      </label>
                      <input
                        type="text"
                        name="area_name"
                        id="area_name"
                        value={values.area_name}
                        onChange={handleChange}
                        placeholder="Enter Shipping Area Name"
                        className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                      />
                      <p className="text-sm text-red-500 pb-3">
                        {errors.area_name}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="price" className="my-2 text-gray-500">
                        Shipping Area Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        value={values.price}
                        onChange={handleChange}
                        placeholder="Enter Shipping Area Price"
                        className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                      />
                      <p className="text-sm text-red-500 pb-3">
                        {errors.price}
                      </p>
                    </div>
                    <div className="flex justify-end my-2">
                      <div>
                        <button
                          className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                          onClick={() => navigate("/admin/shipping")}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                        >
                          Update Area
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
}

export default EditShipping;
