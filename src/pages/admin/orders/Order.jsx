import useSWR from "swr";
import { useEffect, useState } from "react";

import { AiOutlineEye, AiOutlineSetting } from "react-icons/ai";
import { TiTimesOutline } from "react-icons/ti";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlinePrinter } from "react-icons/ai";

import AdminLayout from "../../../components/admin/AdminLayout";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import { useNavigate } from "react-router-dom";
import Conformation from "../../../components/admin/utils/Conformation";
import CancelOrder from "../../../components/admin/utils/CancelOrder";
import { toast } from "react-toastify";

function Order() {
  //* For Loading Effect
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res.json());

  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/order/" + status,
    fetcher
  );

  //* For Updating Data
  const updateOrder = async (id, status) => {
    setLoading(true);
    await fetch(
      `https://api.hamroelectronics.com.np/api/v1/order/update/${id}/${status}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((_) => {
      mutate(data);
      toast("Order status updated successfully", {
        type: "success",
      });
      setLoading(false);
    });
  };

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

  async function deleteOrder(id) {
    const order = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/order/delete/${id}`,
      {

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    order.json().then((data) => {
      toast(data.message, {
        type: "success",
      });
    });
    mutate(data);
    toggleIsDelete();
  }

  //* For Asking to Processing
  const [isPressed, setIsPressed] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [name, setName] = useState();
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    mutate(data);
  }, [isCancelled]);

  if (error) return <ServerError />;

  if (!data && !error) return <Spinner />;

  if (data) {
    return (
      <>
        <AdminLayout>
          {isPressed ? (
            <Conformation
              hide={() => setIsPressed(false)}
              name={name}
              action={() => updateOrder(orderId, name)}
            />
          ) : null}
          {isDelete ? (
            <ShowDelete
              delete={deleteOrder}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}
          {isCancelled ? (
            <CancelOrder
              hide={() => setIsCancelled(false)}
              orderId={orderId}
              refresh={mutate(data)}
            />
          ) : null}
          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">
                Manage Orders -{" "}
                <span className="text-2xl capitalize">{status} orders</span>
              </h1>
            </div>
            <hr className="my-2" />

            <div className="flex justify-end my-2">
              <button
                className="py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md mr-2 "
                onClick={() => setStatus("pending")}
              >
                Pending
              </button>
              <button
                className="py-2 px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-md mr-2 "
                onClick={() => setStatus("processing")}
              >
                Processing
              </button>
              <button
                className="py-2 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mr-2 "
                onClick={() => setStatus("completed")}
              >
                Completed
              </button>
              <button
                className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md mr-2 "
                onClick={() => setStatus("cancelled")}
              >
                Cancelled
              </button>
            </div>
            <div className="overflow-auto">
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">S.No</td>
                    <td className="py-2 px-5 ">Customer Name</td>
                    <td className="py-2 px-5 ">Order Time</td>
                    <td className="py-2 px-5 ">Phone Number</td>
                    <td className="py-2 px-5 ">Address</td>
                    <td className="py-2 px-5 ">Area</td>
                    <td className="py-2 px-5 ">Coupon Name</td>
                    <td className="py-2 px-5 ">Payment</td>
                    <td className="py-2 px-5 ">Total Price</td>
                    <td className="py-2 px-5 ">Status</td>
                    <td className="py-2 px-5 ">View Details</td>
                    <td className="py-2 px-5 ">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <Spinner />
                    </tr>
                  ) : (
                    data.data.map((order, index) => {
                      let d = new Date(order.created_at);

                      return (
                        <tr className="border border-gray-200">
                          <td className="py-2 px-5 ">{index + 1}</td>
                          <td className="py-2 px-5 ">{order.fullname}</td>
                          <td className="py-2 px-5 ">
                            {`${d.getFullYear()}/${d.getMonth()}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}`}
                          </td>
                          <td className="py-2 px-5 ">{order.phone}</td>
                          <td className="py-2 px-5 ">
                            {order.shipping_address}
                          </td>
                          <td className="py-2 px-5 ">{order.shipping_area}</td>
                          <td className="py-2 px-5 ">{order.couponname == null ? "-" : order.couponname}</td>
                          <td className="py-2 px-5 ">{order.payment}</td>
                          <td className="py-2 px-5 ">
                            Rs.{" "}
                            {parseInt(order.total_amount) +
                              parseInt(order.shipping_amount) -
                              parseInt(order.coupon_amount)}
                          </td>
                          <td className="py-2 px-5 ">{order.status}</td>
                          <td className="py-2 px-5">
                            <button
                              className="py-1 flex items-center px-5 bg-green-600 hover:bg-green-700 text-white rounded-md mr-2 "
                              onClick={() => {
                                navigate(`/admin/order/view/${order.id}`);
                              }}
                            >
                              <AiOutlineEye className="mr-1" /> Details
                            </button>
                          </td>
                          <td className="py-2 px-5 mt-2 flex items-center h-full">
                            {status === "pending" ? (
                              <div className="flex">
                                <button
                                  className="py-2 px-5 bg-amber-600 hover:bg-amber-700 text-white rounded-md mr-2 "
                                  title="Processing"
                                  onClick={() => {
                                    setOrderId(order.id);
                                    setName("processing");
                                    setIsPressed(true);
                                  }}
                                >
                                  <AiOutlineSetting />
                                </button>
                                <button
                                  className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-md mr-2 "
                                  onClick={() => {
                                    setOrderId(order.id);
                                    setIsCancelled(true);
                                  }}
                                >
                                  <TiTimesOutline />
                                </button>
                              </div>
                            ) : status == "processing" ? (
                              <div className="flex">
                                <button
                                  className="py-2 px-5 bg-amber-600 hover:bg-amber-700 text-white rounded-md mr-2 "
                                  title="Pending"
                                  onClick={() => {
                                    setOrderId(order.id);
                                    setName("pending");
                                    setIsPressed(true);
                                  }}
                                >
                                  <MdOutlinePendingActions />
                                </button>

                                <button
                                  className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mr-2 "
                                  title="Completed"
                                  onClick={() => {
                                    setOrderId(order.id);
                                    setName("completed");
                                    setIsPressed(true);
                                  }}
                                >
                                  <BsCheck2Circle />
                                </button>
                                <button
                                  className="py-2 px-5 bg-lime-600 hover:bg-lime-700 text-white rounded-md mr-2 "
                                  title="print"
                                  onClick={() => {
                                    navigate(`/admin/order/print/${order.id}`);
                                  }}
                                >
                                  <AiOutlinePrinter />
                                </button>
                              </div>
                            ) : (
                              <div className="flex">
                                <button
                                  className="py-2 px-5 bg-amber-600 hover:bg-amber-700 text-white rounded-md mr-2 "
                                  title="Pending"
                                  onClick={() => {
                                    setOrderId(order.id);
                                    setName("pending");
                                    setIsPressed(true);
                                  }}
                                >
                                  <MdOutlinePendingActions />
                                </button>
                                <DeleteButton
                                  click={() => {
                                    toggleIsDelete();
                                    setId(order.id);
                                  }}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default Order;
