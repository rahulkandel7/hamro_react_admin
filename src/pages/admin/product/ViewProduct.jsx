import useSWR from "swr";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../../components/admin/AdminLayout";

function ViewProduct() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const params = useParams();
  const { data: productdata, error: productError } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/product/${params.id}`,
    fetcher
  );

  const { data: categoryData, error: categoryError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/category",
    fetcher
  );

  const { data: subcategoryData, error: subcategoryError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/subcategory",
    fetcher
  );

  const { data: brandData, error: brandError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/brand",
    fetcher
  );

  const navigate = useNavigate();

  if (productdata && brandData && categoryData && subcategoryData) {
    return (
      <>
        <AdminLayout>
          <div className="">
            <div className="h-fit w-full bg-gray-50  shadow-lg">
              <div className="px-6 pt-3 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Product Details</h1>
                <button
                  className="px-6 py-1 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white shadow-md"
                  onClick={() => navigate("/admin/products")}
                >
                  Go Back
                </button>
              </div>
              <hr className="my-2" />
              <div className=" p-5 pt-0 rounded-lg">
                <h1 className="text-gray-800 pb-4 font-semibold text-2xl">
                  {productdata.data.name}
                </h1>

                {/* For Product Image */}
                <div className="flex">
                  {/* First Image */}
                  <div className="mx-2">
                    <p className="my-2 text-gray-500 ">First Photo </p>

                    <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                      {productdata.data.photopath1 ? (
                        <img
                          src={`https://api.hamroelectronics.com.np/public/${productdata.data.photopath1}`}
                          className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1"
                          alt=""
                        />
                      ) : null}
                    </div>
                  </div>
                  {/* Second Image */}
                  <div className="mx-2">
                    <p className="my-2 text-gray-500 ">Second Photo </p>

                    <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                      {productdata.data.photopath2 ? (
                        <img
                          src={`https://api.hamroelectronics.com.np/public/${productdata.data.photopath2}`}
                          className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1"
                          alt=""
                        />
                      ) : null}
                    </div>
                  </div>
                  {/* Third Image */}
                  <div className="mx-2">
                    <p className="my-2 text-gray-500 ">Third Photo </p>

                    <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                      {productdata.data.photopath3 ? (
                        <img
                          src={`https://api.hamroelectronics.com.np/public/${productdata.data.photopath3}`}
                          className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1"
                          alt=""
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 my-5 gap-5">
                  <div className="px-6">
                    <h1 className="text-2xl font-bold">
                      {productdata.data.title}
                    </h1>
                    <p className="text-gray-400 py-2">
                      Brand:{" "}
                      <span className="text-gray-800 font-bold px-1">
                        {productdata.data.brand_name}
                      </span>
                    </p>

                    <p className="text-gray-400 py-2">
                      Category:{" "}
                      <span className="text-gray-800 font-bold px-1">
                        {productdata.data.category_name}
                      </span>
                    </p>

                    <p className="text-gray-400 py-2">
                      Stock:{" "}
                      <span className="text-gray-800 font-bold px-1">
                        {productdata.data.stock}
                      </span>
                    </p>

                    <p className="text-gray-400 py-2">
                      Color:{" "}
                      <span className="text-gray-800 font-bold px-1">
                        {productdata.data.color}
                      </span>
                    </p>

                    <p className="text-gray-400 py-2">
                      Size:{" "}
                      <span className="text-gray-800 font-bold px-1">
                        {productdata.data.size}
                      </span>
                    </p>

                    {productdata.data.discountedpricee > 0 ? (
                      <div>
                        <div className="mt-2">
                          <p className="text-gray-800 font-bold text-xl">
                            Rs {productdata.data.discountedprice}
                          </p>
                          <p className="text-gray-400 line-through font-bold text-sm">
                            Rs {productdata.data.price}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <p className="text-gray-600 font-bold text-lg">
                          Rs {productdata.data.price}
                        </p>
                      </div>
                    )}

                    <h1 className="text-xl text-gray-700 font-semibold mt-3">
                      Description
                    </h1>
                    <p
                      className="text-sm text-gray-500 text-justify py-2"
                      dangerouslySetInnerHTML={{
                        __html: productdata.data.description,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default ViewProduct;
