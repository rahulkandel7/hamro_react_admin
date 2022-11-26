import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";

function CancelOrder(props) {
  const [reason, setReason] = useState("Out Of Stock");

  //* Cancelled Order
  function cancelOrder() {
    const formData = new FormData();
    formData.append("orderid", props.orderId);
    formData.append("reason", reason);
    formData.append("status", "cancelled");

    fetch("https://api.hamroelectronics.com.np/api/v1/order/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }).then((res) => {
      if (res.status == 200) {
        toast("Order Cancelled Successfully", { type: "success" });
        props.hide();
      }
    });
  }

  return (
    <>
      <div className="bg-black bg-opacity-50 bg-backdrop-blur overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-20 z-50 justify-center items-center md:h-full md:inset-0  align-middle">
        <div className="flex justify-between items-center h-full">
          <div className="relative px-4 w-full max-w-md h-full md:h-auto mx-auto  ">
            <div className="relative bg-gray-50 rounded-lg   shadow-md shadow-gray-500 p-10">
              <div className="flex items-center justify-center">
                <MdOutlineCancel className="text-5xl text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 pt-6 mb-0 text-center">
                Mark this order as <span className="capitalize">Cancel</span> ?
              </h3>
              <p className="text-center text-gray-600 mt-2">
                The user will be notified for each change.
              </p>
              <label htmlFor="reason" className="text-gray-500 mt-2">
                Cancel Reason
              </label>
              <input
                type="text"
                value={reason}
                className="w-full py-2 px-2 rounded-md border border-gray-500 outline-none focus-visible:border-indigo-500 mb-3 mt-1"
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    cancelOrder();
                  }}
                  className="py-3 px-6 mx-2 rounded-md text-white bg-indigo-600 shadow-md  hover:bg-indigo-800 hover:shadow-sm"
                >
                  Yes ! Change It !
                </button>
                <button
                  onClick={() => props.hide()}
                  className="py-3 px-6 mx-2 rounded-md cursor-pointer text-white bg-red-500  hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CancelOrder;
