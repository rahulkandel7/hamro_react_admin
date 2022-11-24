import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { string, object, number, bool } from "yup";

import AdminLayout from "../../../components/admin/AdminLayout";
import AddButton from "../../../components/utils/AddButton";
import { toast } from "react-toastify";

function AddCoupon() {
  const couponSchema = object({
    name: string().required("Coupon Name is required"),
    isAvailable: bool().required("Coupon Availability is required"),
    isAmount: bool().nullable(),
    isPercent: bool().nullable(),
    offerAmount: number().nullable(),
    offerPercent: number().nullable(),
    minAmount: number().required("Minium Amount is required"),
    maxDisAmount: number().required("Maximum Amount is required"),
  });

  const navigate = useNavigate();
  return (
    <>
      <AdminLayout>
        <div className="px-10 py-6 w-full">
          <div className="flex justify-between">
            <h1 className="text-4xl text-gray-700">Add Coupon</h1>
            <NavLink to="/admin/coupon">
              <AddButton name="Go Back" />
            </NavLink>
          </div>
          <hr className="my-2" />
          <Formik
            initialValues={{
              name: "",
              isAvailable: 0,
              isAmount: 0,
              isPercent: 0,
              offerAmount: 0,
              offerPercent: 0,
              minAmount: 0,
              maxDisAmount: 0,
            }}
            validationSchema={couponSchema}
            validateOnChange={false}
            onSubmit={async (values) => {
              fetch("https://api.hamroelectronics.com.np/api/v1/coupon", {
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
                    <label htmlFor="name" className="my-2 text-gray-500">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      placeholder="Enter Coupon Name"
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">{errors.name}</p>
                  </div>

                  <div>
                    <label htmlFor="isAvailable" className="my-2 text-gray-500">
                      Is Available
                    </label>
                    <select
                      name="isAvailable"
                      id="isAvailable"
                      onChange={handleChange}
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    >
                      <option selected={true} disabled={true}>
                        --- IS Available ---
                      </option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    <p className="text-sm text-red-500 pb-3">
                      {errors.isAvailable}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="isAmount" className="my-2 text-gray-500">
                      Is Amount
                    </label>
                    <select
                      name="isAmount"
                      id="isAmount"
                      onChange={handleChange}
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    >
                      <option selected={true} disabled={true}>
                        --- IS Amount ---
                      </option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    <p className="text-sm text-red-500 pb-3">
                      {errors.isAmount}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="offerAmount" className="my-2 text-gray-500">
                      Offer Amount
                    </label>
                    <input
                      type="text"
                      name="offerAmount"
                      id="offerAmount"
                      onChange={handleChange}
                      placeholder="Enter Offer Amount"
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">
                      {errors.offerAmount}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="isPercent" className="my-2 text-gray-500">
                      Is Percentage
                    </label>
                    <select
                      name="isPercent"
                      id="isPercent"
                      onChange={handleChange}
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    >
                      <option selected={true} disabled={true}>
                        --- IS Percent ---
                      </option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    <p className="text-sm text-red-500 pb-3">
                      {errors.isPercent}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="offerPercent"
                      className="my-2 text-gray-500"
                    >
                      Offer Percent
                    </label>
                    <input
                      type="text"
                      name="offerPercent"
                      id="offerPercent"
                      onChange={handleChange}
                      placeholder="Enter Offer Percentage"
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">
                      {errors.offerPercent}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="minAmount" className="my-2 text-gray-500">
                      Minimum Amount
                    </label>
                    <input
                      type="text"
                      name="minAmount"
                      id="minAmount"
                      onChange={handleChange}
                      placeholder="Enter Minium Amount To Apply Coupon"
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">
                      {errors.minAmount}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="maxDisAmount"
                      className="my-2 text-gray-500"
                    >
                      Maximum Discounted Amount
                    </label>
                    <input
                      type="text"
                      name="maxDisAmount"
                      id="maxDisAmount"
                      onChange={handleChange}
                      placeholder="Enter Maximum Amount For Coupon"
                      className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                    />
                    <p className="text-sm text-red-500 pb-3">
                      {errors.maxDisAmount}
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
                        Add Coupon
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

export default AddCoupon;
