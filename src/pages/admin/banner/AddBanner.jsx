import { mixed, number, object, string } from "yup";
import { Formik } from "formik";
import AdminLayout from "../../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddBanner() {
  const navigate = useNavigate();
  const bannerSchema = object({
    priority: number().required("Priority is Required"),
    photopath: mixed().required("Photo is Required"),
  });
  return (
    <>
      <AdminLayout>
        <div className="bg-gray-100 p-5 rounded-lg min-h-screen max-h-fit">
          <h1 className="text-gray-700 text-2xl py-3 font-bold">Add Banner</h1>
          <hr className="border border-gray-300" />
          <Formik
            initialValues={{ priority: "", photopath: "" }}
            validateOnChange={false}
            validationSchema={bannerSchema}
            onSubmit={async (values) => {
              const formData = new FormData();
              formData.append("priority", values.priority);
              formData.append("photopath", values.photopath);

              const response = await fetch(
                "https://api.hamroelectronics.com.np/api/v1/banner",
                {
                  method: "post",
                  body: formData,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                  navigate("/admin/banner");
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
                  <label htmlFor="priority" className="my-2 text-gray-500">
                    Banner Priority
                  </label>
                  <input
                    type="text"
                    name="priority"
                    id="priority"
                    onChange={handleChange}
                    className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                  />
                  <p className="text-sm text-red-500 pb-3">{errors.priority}</p>

                  <p className="my-2 text-gray-500 ">Select Photo</p>
                  <label htmlFor="photopath" className="my-2 text-gray-500 ">
                    <div className=" h-[300px] border-2 border-dashed flex items-center justify-center ">
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
                    className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                  />

                  <p className="text-sm text-red-500 pb-3">
                    {errors.photopath}
                  </p>
                  <div className="flex justify-end my-2">
                    <div>
                      <button
                        className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                        onClick={() => navigate("/admin/ad")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                      >
                        Add Banner
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

export default AddBanner;
