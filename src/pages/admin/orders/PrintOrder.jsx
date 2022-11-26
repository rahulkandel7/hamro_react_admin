import { useRef } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";

import { ToWords } from "to-words";

function PrintOrder() {
  const componentRef = useRef();
  const params = useParams();

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
    mutate,
    error: cartOrderError,
  } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/ordercart/${params.id}`,
    fetcher
  );

  if (cartOrderError) return <ServerError />;

  if (!cartOrder) return <Spinner />;

  if (cartOrder) {
    console.log(cartOrder.data);
    return (
      <>
        <AdminLayout>
          <div className="px-6 py-2 ">
            <div className="flex justify-between items-center print:hidden">
              <h1 className="text-3xl text-gray-700 font-bold">Print Order</h1>
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

            <div ref={componentRef} style={{ fontFamily: "Poppins" }}>
              <div className="mt-8 text-center grid gap-x-8 gap-y-4  print:w-[2480px] print:h-[3508px]">
                <div className="border-4 print:w-[2450px] print:h-[1748px]">
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

                  <div className=" print:mt-10 mt-5 text-center text-slate-700">
                    <p className="print:text-7xl text-4xl font-bold py-10 uppercase underline">
                      Order SLIP
                    </p>
                    <p className="print:hidden flex justify-end mr-16 -mt-32">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="120"
                          height="120"
                          fill="#ffffff"
                        ></rect>
                        <g transform="scale(5.714)">
                          <g transform="translate(0,0)">
                            <path
                              fill-rule="evenodd"
                              d="M9 0L9 2L8 2L8 3L9 3L9 4L10 4L10 5L11 5L11 4L12 4L12 7L11 7L11 6L10 6L10 7L9 7L9 6L8 6L8 8L4 8L4 9L9 9L9 10L2 10L2 13L5 13L5 12L6 12L6 13L7 13L7 12L6 12L6 11L8 11L8 17L10 17L10 19L9 19L9 18L8 18L8 21L11 21L11 20L10 20L10 19L11 19L11 17L12 17L12 16L13 16L13 17L14 17L14 18L15 18L15 17L16 17L16 16L18 16L18 18L20 18L20 19L21 19L21 18L20 18L20 17L21 17L21 16L20 16L20 17L19 17L19 16L18 16L18 15L21 15L21 14L20 14L20 13L21 13L21 10L20 10L20 9L19 9L19 8L18 8L18 9L19 9L19 10L18 10L18 11L17 11L17 10L16 10L16 11L17 11L17 12L16 12L16 13L15 13L15 11L14 11L14 13L13 13L13 12L12 12L12 13L9 13L9 11L10 11L10 9L12 9L12 8L13 8L13 9L14 9L14 10L15 10L15 8L13 8L13 4L12 4L12 3L13 3L13 2L12 2L12 1L13 1L13 0L11 0L11 1L10 1L10 0ZM10 2L10 4L11 4L11 2ZM10 7L10 8L11 8L11 7ZM0 8L0 9L3 9L3 8ZM12 10L12 11L13 11L13 10ZM0 11L0 13L1 13L1 11ZM4 11L4 12L5 12L5 11ZM17 12L17 13L16 13L16 15L18 15L18 14L19 14L19 13L18 13L18 12ZM12 13L12 15L13 15L13 13ZM14 13L14 14L15 14L15 13ZM17 13L17 14L18 14L18 13ZM10 14L10 16L11 16L11 14ZM14 15L14 16L15 16L15 15ZM12 18L12 19L13 19L13 18ZM16 18L16 19L17 19L17 18ZM14 19L14 21L15 21L15 19ZM18 19L18 21L19 21L19 19ZM12 20L12 21L13 21L13 20ZM16 20L16 21L17 21L17 20ZM20 20L20 21L21 21L21 20ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM14 0L14 7L21 7L21 0ZM15 1L15 6L20 6L20 1ZM16 2L16 5L19 5L19 2ZM0 14L0 21L7 21L7 14ZM1 15L1 20L6 20L6 15ZM2 16L2 19L5 19L5 16Z"
                              fill="#000000"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </p>
                    <p className="print:!flex !hidden justify-end mr-52 -mt-48 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="350"
                        height="350"
                        viewBox="0 0 350 350"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="350"
                          height="350"
                          fill="#ffffff"
                        ></rect>
                        <g transform="scale(13.667)">
                          <g transform="translate(0,0)">
                            <path
                              fill-rule="evenodd"
                              d="M9 0L9 2L8 2L8 3L9 3L9 4L10 4L10 5L11 5L11 4L12 4L12 7L11 7L11 6L10 6L10 7L9 7L9 6L8 6L8 8L4 8L4 9L9 9L9 10L2 10L2 13L5 13L5 12L6 12L6 13L7 13L7 12L6 12L6 11L8 11L8 17L10 17L10 19L9 19L9 18L8 18L8 21L11 21L11 20L10 20L10 19L11 19L11 17L12 17L12 16L13 16L13 17L14 17L14 18L15 18L15 17L16 17L16 16L18 16L18 18L20 18L20 19L21 19L21 18L20 18L20 17L21 17L21 16L20 16L20 17L19 17L19 16L18 16L18 15L21 15L21 14L20 14L20 13L21 13L21 10L20 10L20 9L19 9L19 8L18 8L18 9L19 9L19 10L18 10L18 11L17 11L17 10L16 10L16 11L17 11L17 12L16 12L16 13L15 13L15 11L14 11L14 13L13 13L13 12L12 12L12 13L9 13L9 11L10 11L10 9L12 9L12 8L13 8L13 9L14 9L14 10L15 10L15 8L13 8L13 4L12 4L12 3L13 3L13 2L12 2L12 1L13 1L13 0L11 0L11 1L10 1L10 0ZM10 2L10 4L11 4L11 2ZM10 7L10 8L11 8L11 7ZM0 8L0 9L3 9L3 8ZM12 10L12 11L13 11L13 10ZM0 11L0 13L1 13L1 11ZM4 11L4 12L5 12L5 11ZM17 12L17 13L16 13L16 15L18 15L18 14L19 14L19 13L18 13L18 12ZM12 13L12 15L13 15L13 13ZM14 13L14 14L15 14L15 13ZM17 13L17 14L18 14L18 13ZM10 14L10 16L11 16L11 14ZM14 15L14 16L15 16L15 15ZM12 18L12 19L13 19L13 18ZM16 18L16 19L17 19L17 18ZM14 19L14 21L15 21L15 19ZM18 19L18 21L19 21L19 19ZM12 20L12 21L13 21L13 20ZM16 20L16 21L17 21L17 20ZM20 20L20 21L21 21L21 20ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM14 0L14 7L21 7L21 0ZM15 1L15 6L20 6L20 1ZM16 2L16 5L19 5L19 2ZM0 14L0 21L7 21L7 14ZM1 15L1 20L6 20L6 15ZM2 16L2 19L5 19L5 16Z"
                              fill="#000000"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </p>
                  </div>

                  <div className="font-semibold text-left ml-6 print:ml-24 text-gray-800 mt-0 print:-mt-24 print:mb-4">
                    <p className="print:text-4xl my-3">Order No : 10036</p>
                    <p className="print:text-4xl my-3">
                      Order Date : 2022-08-01
                    </p>
                    <p className="print:text-4xl my-3">
                      Customer's Name : test
                    </p>
                    <p className="print:text-4xl my-3">
                      Address : gaindakot,Nepal
                    </p>
                  </div>
                  <p className="w-full border-b-2 border-dashed border-gray-700"></p>
                  <div className="mt-4 print:mt-14 ">
                    <table className="w-11/12 mx-16 print:mx-52 print:text-5xl text-center max-h-[300px] print:max-h-[600px]">
                      <tbody>
                        <tr className="text-left font-semibold">
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            S.N.
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Items
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Size
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Color
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Price
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Quantity
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Total
                          </th>
                        </tr>

                        {cartOrder.data.map((cart, index) => {
                          return (
                            <tr className="border-t-2 border-dashed border-gray-600 font-normal">
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {index + 1}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.productname}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.size}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.color}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.rate}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.quantity}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.totalprice}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="border-t-2 border-dashed border-gray-600">
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-right py-2 print:py-9"
                            colspan="6"
                          >
                            Total
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-left py-2 print:py-9 border-t-2 border-dashed border-gray-600">
                            Rs.{" "}
                            {cartOrder.data.reduce(
                              (acc, item) => acc + item.totalprice,
                              0
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-right py-2 print:py-9"
                            colspan="6"
                          >
                            Delivery Charge
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-left py-2 print:py-9 border-t-2 border-dashed border-gray-600 ">
                            Rs. 100
                          </td>
                        </tr>

                        <tr>
                          <td
                            className="px-2 font-bold print:px-12 text-2xl print:text-5xl text-right py-2 print:py-9"
                            colspan="6"
                          >
                            Grand Total
                          </td>
                          <td className="px-2 font-bold print:px-12 text-2xl print:text-5xl text-left py-2 print:py-9 border-t-2 border-dashed border-gray-600">
                            Rs. <span id="total1">1975</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="font-bold text-2xl print:text-6xl text-left ml-6 print:ml-24">
                      In Words:{" "}
                      <span className="capitalize">{toWords.convert(369)}</span>
                    </p>
                    <p className="!hidden print:!block print:mt-8 text-2xl print:text-3xl font-bold pb-4 print:pb-4">
                      Thank You For Shopping !
                    </p>
                  </div>
                </div>

                <div className="border-4 print:w-[2450px] print:h-[1748px]">
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

                  <div className=" print:mt-10 mt-5 text-center text-slate-700">
                    <p className="print:text-7xl text-4xl font-bold py-10 uppercase underline">
                      Order SLIP
                    </p>
                    <p className="print:hidden flex justify-end mr-16 -mt-32">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="120"
                          height="120"
                          fill="#ffffff"
                        ></rect>
                        <g transform="scale(5.714)">
                          <g transform="translate(0,0)">
                            <path
                              fill-rule="evenodd"
                              d="M9 0L9 2L8 2L8 3L9 3L9 4L10 4L10 5L11 5L11 4L12 4L12 7L11 7L11 6L10 6L10 7L9 7L9 6L8 6L8 8L4 8L4 9L9 9L9 10L2 10L2 13L5 13L5 12L6 12L6 13L7 13L7 12L6 12L6 11L8 11L8 17L10 17L10 19L9 19L9 18L8 18L8 21L11 21L11 20L10 20L10 19L11 19L11 17L12 17L12 16L13 16L13 17L14 17L14 18L15 18L15 17L16 17L16 16L18 16L18 18L20 18L20 19L21 19L21 18L20 18L20 17L21 17L21 16L20 16L20 17L19 17L19 16L18 16L18 15L21 15L21 14L20 14L20 13L21 13L21 10L20 10L20 9L19 9L19 8L18 8L18 9L19 9L19 10L18 10L18 11L17 11L17 10L16 10L16 11L17 11L17 12L16 12L16 13L15 13L15 11L14 11L14 13L13 13L13 12L12 12L12 13L9 13L9 11L10 11L10 9L12 9L12 8L13 8L13 9L14 9L14 10L15 10L15 8L13 8L13 4L12 4L12 3L13 3L13 2L12 2L12 1L13 1L13 0L11 0L11 1L10 1L10 0ZM10 2L10 4L11 4L11 2ZM10 7L10 8L11 8L11 7ZM0 8L0 9L3 9L3 8ZM12 10L12 11L13 11L13 10ZM0 11L0 13L1 13L1 11ZM4 11L4 12L5 12L5 11ZM17 12L17 13L16 13L16 15L18 15L18 14L19 14L19 13L18 13L18 12ZM12 13L12 15L13 15L13 13ZM14 13L14 14L15 14L15 13ZM17 13L17 14L18 14L18 13ZM10 14L10 16L11 16L11 14ZM14 15L14 16L15 16L15 15ZM12 18L12 19L13 19L13 18ZM16 18L16 19L17 19L17 18ZM14 19L14 21L15 21L15 19ZM18 19L18 21L19 21L19 19ZM12 20L12 21L13 21L13 20ZM16 20L16 21L17 21L17 20ZM20 20L20 21L21 21L21 20ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM14 0L14 7L21 7L21 0ZM15 1L15 6L20 6L20 1ZM16 2L16 5L19 5L19 2ZM0 14L0 21L7 21L7 14ZM1 15L1 20L6 20L6 15ZM2 16L2 19L5 19L5 16Z"
                              fill="#000000"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </p>
                    <p className="print:!flex !hidden justify-end mr-52 -mt-48 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="350"
                        height="350"
                        viewBox="0 0 350 350"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="350"
                          height="350"
                          fill="#ffffff"
                        ></rect>
                        <g transform="scale(13.667)">
                          <g transform="translate(0,0)">
                            <path
                              fill-rule="evenodd"
                              d="M9 0L9 2L8 2L8 3L9 3L9 4L10 4L10 5L11 5L11 4L12 4L12 7L11 7L11 6L10 6L10 7L9 7L9 6L8 6L8 8L4 8L4 9L9 9L9 10L2 10L2 13L5 13L5 12L6 12L6 13L7 13L7 12L6 12L6 11L8 11L8 17L10 17L10 19L9 19L9 18L8 18L8 21L11 21L11 20L10 20L10 19L11 19L11 17L12 17L12 16L13 16L13 17L14 17L14 18L15 18L15 17L16 17L16 16L18 16L18 18L20 18L20 19L21 19L21 18L20 18L20 17L21 17L21 16L20 16L20 17L19 17L19 16L18 16L18 15L21 15L21 14L20 14L20 13L21 13L21 10L20 10L20 9L19 9L19 8L18 8L18 9L19 9L19 10L18 10L18 11L17 11L17 10L16 10L16 11L17 11L17 12L16 12L16 13L15 13L15 11L14 11L14 13L13 13L13 12L12 12L12 13L9 13L9 11L10 11L10 9L12 9L12 8L13 8L13 9L14 9L14 10L15 10L15 8L13 8L13 4L12 4L12 3L13 3L13 2L12 2L12 1L13 1L13 0L11 0L11 1L10 1L10 0ZM10 2L10 4L11 4L11 2ZM10 7L10 8L11 8L11 7ZM0 8L0 9L3 9L3 8ZM12 10L12 11L13 11L13 10ZM0 11L0 13L1 13L1 11ZM4 11L4 12L5 12L5 11ZM17 12L17 13L16 13L16 15L18 15L18 14L19 14L19 13L18 13L18 12ZM12 13L12 15L13 15L13 13ZM14 13L14 14L15 14L15 13ZM17 13L17 14L18 14L18 13ZM10 14L10 16L11 16L11 14ZM14 15L14 16L15 16L15 15ZM12 18L12 19L13 19L13 18ZM16 18L16 19L17 19L17 18ZM14 19L14 21L15 21L15 19ZM18 19L18 21L19 21L19 19ZM12 20L12 21L13 21L13 20ZM16 20L16 21L17 21L17 20ZM20 20L20 21L21 21L21 20ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM14 0L14 7L21 7L21 0ZM15 1L15 6L20 6L20 1ZM16 2L16 5L19 5L19 2ZM0 14L0 21L7 21L7 14ZM1 15L1 20L6 20L6 15ZM2 16L2 19L5 19L5 16Z"
                              fill="#000000"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </p>
                  </div>

                  <div className="font-semibold text-left ml-6 print:ml-24 text-gray-800 mt-0 print:-mt-24 print:mb-4">
                    <p className="print:text-4xl my-3">Order No : 10036</p>
                    <p className="print:text-4xl my-3">
                      Order Date : 2022-08-01
                    </p>
                    <p className="print:text-4xl my-3">
                      Customer's Name : test
                    </p>
                    <p className="print:text-4xl my-3">
                      Address : gaindakot,Nepal
                    </p>
                  </div>
                  <p className="w-full border-b-2 border-dashed border-gray-700"></p>
                  <div className="mt-4 print:mt-14 ">
                    <table className="w-11/12 mx-16 print:mx-52 print:text-5xl text-center max-h-[300px] print:max-h-[600px]">
                      <tbody>
                        <tr className="text-left font-semibold">
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            S.N.
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Items
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Size
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Color
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Price
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Quantity
                          </th>
                          <th className="px-2 print:px-12 pb-2 print:pb-9">
                            Total
                          </th>
                        </tr>

                        {cartOrder.data.map((cart, index) => {
                          return (
                            <tr className="border-t-2 border-dashed border-gray-600 font-normal">
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {index + 1}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.productname}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.size}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.color}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.rate}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.quantity}
                              </td>
                              <td className="px-2 print:px-12 text-xl print:text-4xl text-left py-2 print:py-9">
                                {cart.totalprice}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="border-t-2 border-dashed border-gray-600">
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-right py-2 print:py-9"
                            colspan="6"
                          >
                            Total
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-left py-2 print:py-9 border-t-2 border-dashed border-gray-600">
                            Rs.{" "}
                            {cartOrder.data.reduce(
                              (acc, item) => acc + item.totalprice,
                              0
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td
                            className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-right py-2 print:py-9"
                            colspan="6"
                          >
                            Delivery Charge
                          </td>
                          <td className="px-2 font-semibold print:px-12 text-xl print:text-5xl text-left py-2 print:py-9 border-t-2 border-dashed border-gray-600 ">
                            Rs. 100
                          </td>
                        </tr>

                        <tr>
                          <td
                            className="px-2 font-bold print:px-12 text-2xl print:text-5xl text-right py-2 print:py-9"
                            colspan="6"
                          >
                            Grand Total
                          </td>
                          <td className="px-2 font-bold print:px-12 text-2xl print:text-5xl text-left py-2 print:py-9 border-t-2 border-dashed border-gray-600">
                            Rs. <span id="total1">1975</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="font-bold text-2xl print:text-6xl text-left ml-6 print:ml-24">
                      In Words:{" "}
                      <span className="capitalize">{toWords.convert(369)}</span>
                    </p>
                    <p className="!hidden print:!block print:mt-8 text-2xl print:text-3xl font-bold pb-4 print:pb-4">
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
