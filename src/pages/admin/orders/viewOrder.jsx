import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { TiTimesOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";

function ViewOrder() {
  const params = useParams();
  const navigate = useNavigate();
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  const { data, mutate, error } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/ordercart/${params.id}`,
    fetcher
  );
  if (error) return <ServerError />;

  if (!data) return <Spinner />;

  if (data) {
    console.log(data);
    return (
      <>
        <AdminLayout>
          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Manage Orders</h1>
              <button
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full mr-2 "
                onClick={() => {
                  navigate("/admin/order");
                }}
              >
                Back To Order
              </button>
            </div>
            <hr className="my-2" />

            <div className="overflow-auto">
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">S.No</td>
                    <td className="py-2 px-5 ">Product Image</td>
                    <td className="py-2 px-5 ">Product Name</td>
                    <td className="py-2 px-5 ">Rate</td>
                    <td className="py-2 px-5 ">Size</td>
                    <td className="py-2 px-5 ">Color</td>
                    <td className="py-2 px-5 ">Quantity</td>
                    <td className="py-2 px-5 ">Total Price</td>
                    <td className="py-2 px-5 ">Status</td>
                    <td className="py-2 px-5 ">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((cart, index) => {
                    return (
                      <tr>
                        <td className="py-2 px-5 ">{index + 1}</td>
                        <td className="py-2 px-5 ">
                          <img
                            src={`https://api.hamroelectronics.com.np/public/${cart.photopath}`}
                            alt=""
                            className="w-20 h-20"
                          />
                        </td>
                        <td className="py-2 px-5 ">{cart.productname}</td>
                        <td className="py-2 px-5 ">Rs {cart.rate}</td>
                        <td className="py-2 px-5 ">{cart.size}</td>
                        <td className="py-2 px-5 ">{cart.color}</td>
                        <td className="py-2 px-5 ">{cart.quantity}</td>
                        <td className="py-2 px-5 ">Rs {cart.totalprice}</td>

                        <td className="py-2 px-5 ">{cart.status}</td>

                        <td className="py-2 px-5 mt-5 flex items-center h-full">
                          <button
                            className="py-2 px-5 bg-amber-600 hover:bg-amber-700 text-white rounded-md mr-2 "
                            title="Pending"
                          >
                            <MdOutlinePendingActions />
                          </button>

                          <button
                            className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mr-2 "
                            title="Completed"
                          >
                            <BsCheck2Circle />
                          </button>

                          <button className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-md mr-2 ">
                            <TiTimesOutline />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default ViewOrder;
