import { useRef } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";
import QRCode from "react-qr-code";

import { ToWords } from "to-words";

function PrintOrder() {
  const componentRef = useRef();
  const params = useParams();

  const navigate = useNavigate();

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Rupee",
        plural: "Rupees",
        symbol: "Rs.",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  const {
    data: cartOrder,
    mutate: mutateCartOrder,
    error: cartOrderError,
  } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/ordercart/${params.id}`,
    fetcher
  );

  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/order/processing",
    fetcher
  );

  if (cartOrderError) return <ServerError />;

  if (!cartOrder) return <AdminLayout loading={true} />;

  if (cartOrder && data) {
    let order = data.data.filter((order) => {
      return order.id == params.id;
    });
    let date = new Date(order[0].created_at);

    let total = cartOrder.data.reduce((acc, item) => acc + item.totalprice, 0);

    let totalPrice =
      parseInt(total) +
      parseInt(order[0].delivery_charge) -
      parseInt(order[0].coupon_amount);

    return (
      <>
        <AdminLayout>
          <div className="px-6 py-2 ">
            <div className="flex justify-between items-center print:hidden">
              <div className="flex items-center">
                <h1 className="text-3xl text-gray-700 font-bold">
                  Print Order
                </h1>
                <button
                  className="py-2 px-5 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white shadow-md text-xs ml-3"
                  onClick={() => {
                    navigate("/admin/order");
                  }}
                >
                  Go Back
                </button>
              </div>
              <ReactToPrint
                trigger={() => (
                  <button
                    className="py-2 px-5 flex items-center text-lg bg-lime-600 hover:bg-lime-700 text-white rounded-md mr-2 "
                    title="print"
                    onClick={() => {
                      window.print("#printmenu");
                    }}
                  >
                    <AiOutlinePrinter className="mr-1" /> Print
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
            <hr className="my-3" />

            <div ref={componentRef}>
              <div className="mt-8 text-center grid gap-x-8 gap-y-4  print:w-[2480px] print:h-[3508px]">
                <div className="border-4 print:w-[2450px] print:h-[1748px] relative">
                  <div className="print:mt-2 mt-2">
                    <p className="text-5xl print:text-8xl mb-0 pb-0 print:pb-2">
                      Hamro Electronics
                    </p>
                    <p className="text-xl print:text-4xl mt-0 pt-0 print:pb-3">
                      Sahidchowk, Narayangarh
                    </p>
                    <p className="text-xl print:text-4xl mt-0 pt-0 print:pb-3">
                      9864068268, 9801521884
                    </p>
                    <p className="text-xl print:text-4xl mt-0 pt-0 print:pb-3">
                      056-521884
                    </p>
                  </div>

                  <div className=" print:mt-10 mt-5 text-center text-gray-900">
                    <p className="print:text-7xl text-4xl font-bold py-10 uppercase underline">
                      Order SLIP
                    </p>

                    <p className="print:hidden flex justify-end mr-16 -mt-32">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",

                          width: "10%",
                        }}
                        value={`100${order[0].id}`}
                        viewBox={`0 0 256 256`}
                      />
                    </p>
                    <p className="print:!flex !hidden justify-end mr-52 -mt-48 ">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",

                          width: "15%",
                        }}
                        value={`100${order[0].id}`}
                        viewBox={`0 0 256 256`}
                      />
                    </p>
                  </div>

                  <div className="font-semibold text-left ml-6 print:ml-24 text-gray-800 mt-0 print:-mt-24 print:mb-4">
                    <p className="print:text-4xl my-3">
                      Order No : 100{order[0].id}
                    </p>
                    <p className="print:text-4xl my-3">
                      Order Date :{" "}
                      {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                    </p>
                    <p className="print:text-4xl my-3">
                      Customer's Name : {order[0].fullname}
                    </p>
                    <p className="print:text-4xl my-3">
                      Address : {order[0].shipping_address}
                    </p>
                  </div>
                  <p className="w-full border-b-2 border-dashed border-gray-700"></p>
                  <div className="mt-4 print:mt-14 ">
                    <table className="w-11/12 mx-16 print:mx-52 print:text-3xl text-center max-h-[300px] print:max-h-[600px]">
                      <tbody>
                        <tr className="text-left font-semibold">
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            S.N.
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Items
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Price
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Quantity
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Total
                          </th>
                        </tr>

                        {cartOrder.data.map((cart, index) => {
                          return (
                            <tr className="border-t-2 border-dashed border-gray-600 font-normal">
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {index + 1}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.productname}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.rate}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.quantity}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.totalprice}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="border-t-2 border-dashed border-gray-600">
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-right py-2 print:py-6"
                            colspan="4"
                          >
                            Total
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600">
                            Rs.{" "}
                            {cartOrder.data.reduce(
                              (acc, item) => acc + item.totalprice,
                              0
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-right py-2 print:py-6"
                            colspan="4"
                          >
                            Delivery Charge
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600 ">
                            Rs. {order[0].delivery_charge}
                          </td>
                        </tr>
                        {order[0].coupon_amount > 0 ? (
                          <tr>
                            <td
                              className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-right py-2 print:py-6"
                              colspan="4"
                            >
                              Coupon Discount
                            </td>
                            <td className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600 ">
                              Rs. {order[0].coupon_amount}
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td
                            className="px-2 font-bold print:px-12 text-2xl print:text-3xl text-right py-2 print:py-6"
                            colspan="4"
                          >
                            Grand Total
                          </td>
                          <td className="px-2 font-bold print:px-12 text-2xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600">
                            Rs. {totalPrice}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="font-bold text-2xl print:text-4xl text-left ml-6 print:ml-24">
                      In Words:{" "}
                      <span className="capitalize">
                        {toWords.convert(totalPrice)}
                      </span>
                    </p>
                    <p class="!hidden print:!block left-0 right-0 absolute bottom-0 text-2xl print:text-3xl font-bold pb-4 print:pb-12">
                      Thank You For Shopping !
                    </p>
                  </div>
                </div>

                <div className="border-4 print:w-[2450px] print:h-[1748px] relative">
                  <div className="print:mt-2 mt-2 print:pt-4">
                    <p className="text-5xl print:text-8xl mb-0 pb-0 print:pb-2">
                      Hamro Electronics
                    </p>
                    <p className="text-xl print:text-4xl mt-0 pt-0 print:pb-3">
                      Sahidchowk, Narayangarh
                    </p>
                    <p className="text-xl print:text-4xl mt-0 pt-0 print:pb-3">
                      9864068268, 9801521884
                    </p>
                    <p className="text-xl print:text-4xl mt-0 pt-0 print:pb-3">
                      056-521884
                    </p>
                  </div>

                  <div className=" print:mt-10 mt-5 text-center text-gray-900">
                    <p className="print:text-7xl text-4xl font-bold py-10 uppercase underline">
                      Order SLIP
                    </p>

                    <p className="print:hidden flex justify-end mr-16 -mt-32">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",

                          width: "10%",
                        }}
                        value={`100${order[0].id}`}
                        viewBox={`0 0 256 256`}
                      />
                    </p>
                    <p className="print:!flex !hidden justify-end mr-52 -mt-48 ">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          width: "15%",
                        }}
                        value={`100${order[0].id}`}
                        viewBox={`0 0 256 256`}
                      />
                    </p>
                  </div>

                  <div className="font-semibold text-left ml-6 print:ml-24 text-gray-800 mt-0 print:-mt-24 print:mb-4">
                    <p className="print:text-4xl my-3">
                      Order No : 100{order[0].id}
                    </p>
                    <p className="print:text-4xl my-3">
                      Order Date :{" "}
                      {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                    </p>
                    <p className="print:text-4xl my-3">
                      Customer's Name : {order[0].fullname}
                    </p>
                    <p className="print:text-4xl my-3">
                      Address : {order[0].shipping_address}
                    </p>
                  </div>
                  <p className="w-full border-b-2 border-dashed border-gray-700"></p>
                  <div className="mt-4 print:mt-14 ">
                    <table className="w-11/12 mx-16 print:mx-52 print:text-3xl text-center max-h-[300px] print:max-h-[600px]">
                      <tbody>
                        <tr className="text-left font-semibold">
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            S.N.
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Items
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Price
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Quantity
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-5">
                            Total
                          </th>
                        </tr>

                        {cartOrder.data.map((cart, index) => {
                          return (
                            <tr className="border-t-2 border-dashed border-gray-600 font-normal">
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {index + 1}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.productname}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.rate}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.quantity}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-3xl text-left py-2 print:py-6">
                                {cart.totalprice}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="border-t-2 border-dashed border-gray-600">
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-right py-2 print:py-6"
                            colspan="4"
                          >
                            Total
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600">
                            Rs.{" "}
                            {cartOrder.data.reduce(
                              (acc, item) => acc + item.totalprice,
                              0
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-right py-2 print:py-6"
                            colspan="4"
                          >
                            Delivery Charge
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600 ">
                            Rs. {order[0].delivery_charge}
                          </td>
                        </tr>
                        {order[0].coupon_amount > 0 ? (
                          <tr>
                            <td
                              className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-right py-2 print:py-6"
                              colspan="4"
                            >
                              Coupon Discount
                            </td>
                            <td className="px-2 font-semibold print:px-12 text-xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600 ">
                              Rs. {order[0].coupon_amount}
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td
                            className="px-2 font-bold print:px-12 text-2xl print:text-3xl text-right py-2 print:py-6"
                            colspan="4"
                          >
                            Grand Total
                          </td>
                          <td className="px-2 font-bold print:px-12 text-2xl print:text-3xl text-left py-2 print:py-6 border-t-2 border-dashed border-gray-600">
                            Rs. {totalPrice}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="font-bold text-2xl print:text-4xl text-left ml-6 print:ml-24">
                      In Words:{" "}
                      <span className="capitalize">
                        {toWords.convert(totalPrice)}
                      </span>
                    </p>
                    <p class="!hidden print:!block left-0 right-0 absolute bottom-0 text-2xl print:text-3xl font-bold pb-4 print:pb-12">
                      Thank You For Shopping !
                    </p>
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

export default PrintOrder;
