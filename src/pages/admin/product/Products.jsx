import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";
import SearchBox from "../../../components/utils/SearchBox";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";

import { AiOutlineEye } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";

function Product() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/product",
    fetcher
  );

  const {
    data: categoryData,
    mutate: categoryMutate,
    error: categoryError,
  } = useSWR("https://api.hamroelectronics.com.np/api/v1/category", fetcher);

  //* For Category wise Filtering
  const [categoryId, setCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data?.data?.filter((product) => product.category_id == categoryId));
  }, [categoryId]);


  //* For searching data
  const [search, setSearch] = useState("");

  //* For deleting data
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState();

  const toggleIsDelete = () => {
    if (isDelete) {
      setIsDelete(false);
    } else {
      setIsDelete(true);
    }
  };

  //* For Deleteing Category

  async function deleteProduct(id) {
    fetch(`https://api.hamroelectronics.com.np/api/v1/product/delete/${id}`, {

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        toast(data.message, {
          type: "success",
        });
      });
    });

    mutate();
    toggleIsDelete();
  }

  const navigate = useNavigate();
  //! Show Error
  if (error) {
    return <ServerError />;
  }

  //*Show Loading
  if (!data && !error) {
    return <Spinner />;
  }

  //? Show Data when loaded
  if (data && categoryData) {
console.log(data);
    return (
      <>
        <AdminLayout>
          {isDelete ? (
            <ShowDelete
              delete={deleteProduct}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}

          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Products</h1>

              <NavLink to="create">
                <AddButton name="Add Product" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <SearchBox
              name="Products"
              change={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className="flex">
              <button
                className={`px-4 py-1 rounded-full   hover:bg-indigo-500 hover:text-white border border-indigo-500 m-2 ${
                  categoryId == 0 ? "bg-indigo-500 text-white" : "text-black"
                }`}
                onClick={() => setCategoryId(0)}
              >
                All
              </button>
              {categoryData.data.map((category) => {
                return (
                  <button className={`px-4 py-1 rounded-full  hover:bg-indigo-500 hover:text-white border border-indigo-500 m-2  ${
                    categoryId == category.id ? "bg-indigo-500 text-white" : "text-black"
                  }`} onClick={()=>setCategoryId(category.id)} key={category.id}>
                    {category.category_name}
                  </button>
                );
              })}
            </div>
           {
            categoryId == 0 ? 
            <div className="overflow-scroll">
            <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
              <thead className="bg-gray-500 ">
                <tr className="w-full border border-gray-100 text-white">
                  <td className="py-2 px-5 ">SKU</td>
                  <td className="py-2 px-5 ">Name</td>
                  <td className="py-2 px-5 ">Image</td>
                  <td className="py-2 px-5 ">Price</td>
                  <td className="py-2 px-5 ">Stock</td>
                  <td className="py-2 px-5 ">Flash Sale </td>
                  <td className="py-2 px-5 ">Deleted</td>
                  <td className="py-2 px-5 ">Actions</td>
                </tr>
              </thead>
              <tbody>
                {search === ""
                  ? data.data.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td className="py-2 px-5 text-gray-600">
                            {product.sku}
                          </td>
                          <td className="py-2 px-5 text-gray-600">
                            {product.name}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            <img
                              src={`https://api.hamroelectronics.com.np/public/${product.photopath1}`}
                              alt=""
                              className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                            />
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {product.price}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {product.stock}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {product.flashsale ? "Yes" : "No"}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {product.deleted == 1 ? "Yes" : "No"}
                          </td>

                          <td className="py-2 px-5 text-gray-600 flex text-lg">
                            <NavLink to={`edit/${product.id}`}>
                              <button
                                className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2"
                                title="edit"
                              >
                                <FiEdit />
                              </button>
                            </NavLink>

                            <NavLink to={`view/${product.id}`}>
                              <button
                                className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-sky-500 hover:bg-sky-700  text-white mx-2"
                                title="show"
                              >
                                <AiOutlineEye />
                              </button>
                            </NavLink>

                            <button
                              className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                              title="delete"
                              onClick={() => {
                                toggleIsDelete();
                                setId(product.id);
                              }}
                            >
                              <CiTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : data.data
                      .filter((product) => {
                        if (search === "") {
                          return product;
                        } else if (
                          product.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return product;
                        }
                      })
                      .map((dat) => {
                        return (
                          <tr key={dat.id}>
                            <td className="py-2 px-5 text-gray-600">
                              {dat.sku}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {dat.name}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              <img
                                src={`https://api.hamroelectronics.com.np/public/${dat.photopath1}`}
                                alt=""
                                className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                              />
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {dat.price}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {dat.stock}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {dat.flashsale == 1 ? "Yes" : "No"}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {dat.deleted == 1 ? "Yes" : "No"}
                            </td>

                            <td className="py-2 px-5 text-gray-600 flex text-lg">
                              <NavLink to={`edit/${dat.id}`}>
                                <button
                                  className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2"
                                  title="edit"
                                >
                                  <FiEdit />
                                </button>
                              </NavLink>

                              <NavLink to={`view/${dat.id}`}>
                                <button
                                  className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-sky-500 hover:bg-sky-700  text-white mx-2"
                                  title="show"
                                >
                                  <AiOutlineEye />
                                </button>
                              </NavLink>

                              <button
                                className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                title="delete"
                                onClick={() => {
                                  toggleIsDelete();
                                  setId(dat.id);
                                }}
                              >
                                <CiTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
              </tbody>
            </table>
          </div> : 
           <div className="overflow-scroll">
           <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
             <thead className="bg-gray-500 ">
               <tr className="w-full border border-gray-100 text-white">
                 <td className="py-2 px-5 ">SKU</td>
                 <td className="py-2 px-5 ">Name</td>
                 <td className="py-2 px-5 ">Image</td>
                 <td className="py-2 px-5 ">Price</td>
                 <td className="py-2 px-5 ">Stock</td>
                 <td className="py-2 px-5 ">Flash Sale </td>
                 <td className="py-2 px-5 ">Deleted</td>
                 <td className="py-2 px-5 ">Actions</td>
               </tr>
             </thead>
             <tbody>
               {search === ""
                 ? products?.map((product) => {
                     return (
                       <tr key={product.id}>
                         <td className="py-2 px-5 text-gray-600">
                           {product.sku}
                         </td>
                         <td className="py-2 px-5 text-gray-600">
                           {product.name}
                         </td>

                         <td className="py-2 px-5 text-gray-600">
                           <img
                             src={`https://api.hamroelectronics.com.np/public/${product.photopath1}`}
                             alt=""
                             className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                           />
                         </td>

                         <td className="py-2 px-5 text-gray-600">
                           {product.price}
                         </td>

                         <td className="py-2 px-5 text-gray-600">
                           {product.stock}
                         </td>

                         <td className="py-2 px-5 text-gray-600">
                           {product.flashsale ? "Yes" : "No"}
                         </td>

                         <td className="py-2 px-5 text-gray-600">
                           {product.deleted == 1 ? "Yes" : "No"}
                         </td>

                         <td className="py-2 px-5 text-gray-600 flex text-lg">
                           <NavLink to={`edit/${product.id}`}>
                             <button
                               className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2"
                               title="edit"
                             >
                               <FiEdit />
                             </button>
                           </NavLink>

                           <NavLink to={`view/${product.id}`}>
                             <button
                               className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-sky-500 hover:bg-sky-700  text-white mx-2"
                               title="show"
                             >
                               <AiOutlineEye />
                             </button>
                           </NavLink>

                           <button
                             className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                             title="delete"
                             onClick={() => {
                               toggleIsDelete();
                               setId(product.id);
                             }}
                           >
                             <CiTrash />
                           </button>
                         </td>
                       </tr>
                     );
                   })
                 : products
                     .filter((product) => {
                       if (search === "") {
                         return product;
                       } else if (
                         product.name
                           .toLowerCase()
                           .includes(search.toLowerCase())
                       ) {
                         return product;
                       }
                     })
                     .map((dat) => {
                       return (
                         <tr key={dat.id}>
                           <td className="py-2 px-5 text-gray-600">
                             {dat.sku}
                           </td>
                           <td className="py-2 px-5 text-gray-600">
                             {dat.name}
                           </td>
                           <td className="py-2 px-5 text-gray-600">
                             <img
                               src={`https://api.hamroelectronics.com.np/public/${dat.photopath1}`}
                               alt=""
                               className="w-32 border border-gray-400 rounded-md shadow-md p-1"
                             />
                           </td>

                           <td className="py-2 px-5 text-gray-600">
                             {dat.price}
                           </td>

                           <td className="py-2 px-5 text-gray-600">
                             {dat.stock}
                           </td>

                           <td className="py-2 px-5 text-gray-600">
                             {dat.flashsale == 1 ? "Yes" : "No"}
                           </td>

                           <td className="py-2 px-5 text-gray-600">
                             {dat.deleted == 1 ? "Yes" : "No"}
                           </td>

                           <td className="py-2 px-5 text-gray-600 flex text-lg">
                             <NavLink to={`edit/${dat.id}`}>
                               <button
                                 className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2"
                                 title="edit"
                               >
                                 <FiEdit />
                               </button>
                             </NavLink>

                             <NavLink to={`view/${dat.id}`}>
                               <button
                                 className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-sky-500 hover:bg-sky-700  text-white mx-2"
                                 title="show"
                               >
                                 <AiOutlineEye />
                               </button>
                             </NavLink>

                             <button
                               className="px-6 py-2 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                               title="delete"
                               onClick={() => {
                                 toggleIsDelete();
                                 setId(dat.id);
                               }}
                             >
                               <CiTrash />
                             </button>
                           </td>
                         </tr>
                       );
                     })}
             </tbody>
           </table>
         </div>
           }
            <div></div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default Product;
