import { mixed, number, object, string } from "yup";
import { Formik } from "formik";
import useSWR from "swr";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddIcon from "../../../components/admin/utils/AddIcon";

function AddProduct() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

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

  const editorRef = useRef(null);

  const productAddSchemea = object({
    name: string().required("Product name is required"),
    price: number().required("Price is required"),
    discountedprice: number().nullable(),
    stock: number().required("Minimum order is required"),
    description: string().required("Description is required"),
    photopath1: mixed().required("First photo is required"),
    photopath2: mixed().nullable("Photo is required"),
    photopath3: mixed().nullable("Photo is required"),
    category_id: number().required("Category is required"),
    sub_category_id: number().nullable(),
    brand_id: number().required("Please seelct brand for the products"),
    sku: number().required("SKU is required"),
    flashsale: number().required("Choose to show in falsh sale or not"),
    available: number().required("Choose to product Status"),
    color: string().required("Color is required"),
    size: string().required("Size is required"),
  });

  return (
    <>
      <AdminLayout>
        <div className="">
          <div className="h-fit w-full bg-gray-50  shadow-lg">
            <div className=" p-5 rounded-lg">
              <h1 className="text-gray-800 py-4 font-semibold text-4xl">
                Add Product
              </h1>
              <hr />
              <Formik
                validateOnChange={false}
                initialValues={{
                  name: "",
                  price: "",
                  discountedprice: "",
                  stock: "",
                  description: "",
                  photopath1: "",
                  photopath2: "",
                  photopath3: "",
                  category_id: "",
                  sub_category_id: "",
                  brand_id: "",
                  sku: Math.floor(Math.random() * 10000000000),
                  flashsale: false,
                  available: true,
                  color: "",
                  size: "",
                }}
                validationSchema={productAddSchemea}
                onSubmit={async (values) => {
                  const formData = new FormData();
                  formData.append("name", values.name);
                  formData.append("price", values.price);
                  formData.append("discountedprice", values.discountedprice);
                  formData.append("stock", values.stock);
                  formData.append("description", values.description);
                  formData.append("photopath1", values.photopath1);
                  formData.append("photopath2", values.photopath2);
                  formData.append("photopath3", values.photopath3);
                  formData.append("category_id", values.category_id);
                  formData.append("sub_category_id", values.sub_category_id);
                  formData.append("brand_id", values.brand_id);
                  formData.append("sku", values.sku);
                  formData.append("flashsale", values.flashsale);
                  formData.append("available", values.available);
                  formData.append("color", values.color);
                  formData.append("size", values.size);

                  const res = await fetch(
                    "https://api.hamroelectronics.com.np/api/v1/product",
                    {
                      method: "post",
                      body: formData,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  res.json().then((data) => {
                    if (data.status) {
                      toast(data.message, {
                        type: "success",
                      });
                      navigate("/admin/products");
                    }
                  });
                }}
              >
                {({
                  errors,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                }) => {
                  return (
                    <form onSubmit={handleSubmit} className="my-4 w-full">
                      {/* For Product Name */}
                      <div className="mx-2">
                        <label htmlFor="name" className="my-2 text-gray-500">
                          Product Name <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.name}
                        </p>
                      </div>

                      {/* For Product SKU */}
                      <div className="mx-2">
                        <label htmlFor="sku" className="my-2 text-gray-500">
                          Product SKU <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="sku"
                          id="sku"
                          value={values.sku}
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.sku}
                        </p>
                      </div>

                      {/* For Product Category */}
                      <div className="mx-2">
                        <label
                          htmlFor="category_id"
                          className="my-2 text-gray-500"
                        >
                          Select Category <sup className="text-red-600">*</sup>
                        </label>
                        <select
                          name="category_id"
                          onChange={handleChange}
                          id="category_id"
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        >
                          <option value="">Select Category</option>
                          {!categoryData ? (
                            <></>
                          ) : (
                            categoryData.data.map((category) => {
                              return (
                                <option value={category.id} key={category.id}>
                                  {category.category_name}
                                </option>
                              );
                            })
                          )}
                        </select>

                        <p className="text-sm text-red-500 pb-3">
                          {errors.category_id}
                        </p>
                      </div>

                      {/* For Product Sub Category */}
                      <div className="mx-2">
                        <label
                          htmlFor="sub_category_id"
                          className="my-2 text-gray-500"
                        >
                          Select Sub Category{" "}
                          <sup className="text-red-600">*</sup>
                        </label>

                        <select
                          name="sub_category_id"
                          onChange={handleChange}
                          id="sub_category_id"
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        >
                          <option value="">Select Category</option>
                          {!subcategoryData ? (
                            <></>
                          ) : (
                            subcategoryData.data.map((subCategory) => {
                              if (
                                values.category_id == subCategory.category_id
                              ) {
                                return (
                                  <option
                                    value={subCategory.id}
                                    key={subCategory.id}
                                  >
                                    {subCategory.subcategory_name}
                                  </option>
                                );
                              }
                            })
                          )}
                        </select>

                        <p className="text-sm text-red-500 pb-3">
                          {errors.sub_category_id}
                        </p>
                      </div>

                      {/* For Product Brand */}
                      <div className="mx-2">
                        <label
                          htmlFor="brand_id"
                          className="my-2 text-gray-500"
                        >
                          Select Brand
                          <sup className="text-red-600">*</sup>
                        </label>

                        <select
                          name="brand_id"
                          onChange={handleChange}
                          id="brand_id"
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        >
                          <option value="">Select Brand</option>
                          {!brandData ? (
                            <></>
                          ) : (
                            brandData.data.map((brand) => {
                              return (
                                <option value={brand.id} key={brand.id}>
                                  {brand.brand_name}
                                </option>
                              );
                            })
                          )}
                        </select>

                        <p className="text-sm text-red-500 pb-3">
                          {errors.sub_category_id}
                        </p>
                      </div>

                      {/* For Product Price */}
                      <div className="mx-2">
                        <label htmlFor="price" className="my-2 text-gray-500">
                          Product Price <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.price}
                        </p>
                      </div>

                      {/* For Product Discounted Price */}
                      <div className="mx-2">
                        <label
                          htmlFor="discountedprice"
                          className="my-2 text-gray-500"
                        >
                          Product Discounted Price
                        </label>
                        <input
                          type="text"
                          name="discountedprice"
                          id="discountedprice"
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.discountedprice}
                        </p>
                      </div>

                      {/* For Product Stock */}
                      <div className="mx-2">
                        <label htmlFor="stock" className="my-2 text-gray-500">
                          Stock <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="stock"
                          id="stock"
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.stock}
                        </p>
                      </div>

                      {/* For Product Flash Sale */}
                      <div className="mx-2">
                        <label
                          htmlFor="flashsale"
                          className="my-2 text-gray-500"
                        >
                          Is Flash Sale <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="radio"
                          name="flashsale"
                          id="flashsale"
                          value={1}
                          onChange={handleChange}
                          className="mx-2"
                        />
                        <span className="text-gray-500 ">Yes</span>

                        <input
                          type="radio"
                          name="flashsale"
                          id="flashsale"
                          value={0}
                          onChange={handleChange}
                          className="mx-2"
                        />
                        <span className="text-gray-500 ">No</span>
                        <p className="text-sm text-red-500 pb-3">
                          {errors.flashsale}
                        </p>
                      </div>

                      {/* For Product Status */}
                      <div className="mx-2">
                        <label htmlFor="available" className="my-2 text-gray-500">
                          Is Available <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="radio"
                          name="available"
                          id="available"
                          value={1}
                          onChange={handleChange}
                          className="mx-2"
                        />
                        <span className="text-gray-500 ">Yes</span>

                        <input
                          type="radio"
                          name="available"
                          id="available"
                          value={0}
                          onChange={handleChange}
                          className="mx-2"
                        />
                        <span className="text-gray-500 ">No</span>
                        <p className="text-sm text-red-500 pb-3">
                          {errors.available}
                        </p>
                      </div>

                      {/* For Product Color */}
                      <div className="mx-2">
                        <label htmlFor="color" className="my-2 text-gray-500">
                          Product Color <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="color"
                          id="color"
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.color}
                        </p>
                      </div>

                      {/* For Product Size */}
                      <div className="mx-2">
                        <label htmlFor="size" className="my-2 text-gray-500">
                          Product Size <sup className="text-red-600">*</sup>
                        </label>
                        <input
                          type="text"
                          name="size"
                          id="size"
                          onChange={handleChange}
                          className="border border-gray-200 bg-gray-50 w-full shadow-gray-100 rounded-md shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                        />
                        <p className="text-sm text-red-500 pb-3">
                          {errors.size}
                        </p>
                      </div>

                      {/* For Product Description */}
                      <div className="mx-2">
                        <label
                          htmlFor="description"
                          className="my-2 text-gray-500"
                        >
                          Description <sup className="text-red-600">*</sup>
                        </label>

                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          textareaName="description"
                          onEditorChange={(e) => {
                            handleChange({
                              target: { name: "description", value: e },
                            });
                          }}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              " autolink lists link charmap print preview anchor",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                        />

                        <p className="text-sm text-red-500 pb-3">
                          {errors.description}
                        </p>
                      </div>

                      {/* For Product Image */}
                      <div className="flex">
                        {/* First Image */}
                        <div className="mx-2">
                          <p className="my-2 text-gray-500 ">
                            Select First Photo (500 X 600){" "}
                            <sup className="text-red-600">*</sup>
                          </p>
                          <label
                            htmlFor="photopath1"
                            className="my-2 text-gray-500 "
                          >
                            <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                              {values.photopath1 ? (
                                <img
                                  src={URL.createObjectURL(values.photopath1)}
                                  className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1 object-cover"
                                  alt=""
                                />
                              ) : (
                                <AddIcon />
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            hidden
                            name="photopath1"
                            id="photopath1"
                            onChange={(e) => {
                              setFieldValue(
                                "photopath1",
                                e.currentTarget.files[0]
                              );
                            }}
                            className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                          />
                          <p className="text-sm text-red-500 pb-3">
                            {errors.photopath1}
                          </p>
                        </div>
                        {/* Second Image */}
                        <div className="mx-2">
                          <p className="my-2 text-gray-500 ">
                            Select Second Photo (500 X 600)
                          </p>
                          <label
                            htmlFor="photopath2"
                            className="my-2 text-gray-500 "
                          >
                            <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                              {values.photopath2 ? (
                                <img
                                  src={URL.createObjectURL(values.photopath2)}
                                  className="w-full h-full border border-gray-200 rounded-lg object-cover shadow-lg p-1"
                                  alt=""
                                />
                              ) : (
                                <AddIcon />
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            hidden
                            name="photopath2"
                            id="photopath2"
                            onChange={(e) => {
                              setFieldValue(
                                "photopath2",
                                e.currentTarget.files[0]
                              );
                            }}
                            className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                          />
                          <p className="text-sm text-red-500 pb-3">
                            {errors.photopath2}
                          </p>
                        </div>
                        {/* Third Image */}
                        <div className="mx-2">
                          <p className="my-2 text-gray-500 ">
                            Select Third Photo (500/600)
                          </p>
                          <label
                            htmlFor="photopath3"
                            className="my-2 text-gray-500 "
                          >
                            <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                              {values.photopath3 ? (
                                <img
                                  src={URL.createObjectURL(values.photopath3)}
                                  className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1"
                                  alt=""
                                />
                              ) : (
                                <AddIcon />
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            hidden
                            name="photopath3"
                            id="photopath3"
                            onChange={(e) => {
                              setFieldValue(
                                "photopath3",
                                e.currentTarget.files[0]
                              );
                            }}
                            className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-indigo-600 my-2"
                          />
                          <p className="text-sm text-red-500 pb-3">
                            {errors.photopath3}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end my-2">
                        <div>
                          <NavLink to="/admin/products">
                            <button className="px-8 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2">
                              Cancel
                            </button>
                          </NavLink>
                          <button
                            type="submit"
                            className="px-8 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded-md shadow-lg hover:shadow-xl mx-2"
                          >
                            Add Product
                          </button>
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default AddProduct;
