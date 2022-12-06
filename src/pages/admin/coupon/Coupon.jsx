import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";
import DeleteButton from "../../../components/utils/buttons/DeleteButton";
import EditButton from "../../../components/utils/buttons/EditButton";
import SearchBox from "../../../components/utils/SearchBox";
import Spinner from "../../../components/utils/Spinner";
import ServerError from "../../500";

function Coupon() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/coupon",
    fetcher
  );
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

  async function deleteCoupon(id) {
    const category = await fetch(
      `https://api.hamroelectronics.com.np/api/v1/coupon/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    category.json().then((data) => {
      toast(data.message, {
        type: "success",
      });
    });
    mutate();
    toggleIsDelete();
  }

  if (error) {
    return <ServerError />;
  }

  if (!error && !data) {
    return <AdminLayout loading={true} />;
  }

  if (data) {
    return (
      <>
        <AdminLayout>
          {isDelete ? (
            <ShowDelete
              delete={deleteCoupon}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}
          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Coupon</h1>
              <NavLink to="create">
                <AddButton name="Add Coupon" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <SearchBox
              name="Coupon"
              change={(e) => {
                setSearch(e.target.value);
              }}
            />

            <div className="overflow-scroll">
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">S.No</td>
                    <td className="py-2 px-5 ">Coupon Name</td>
                    <td className="py-2 px-5 ">Is Available</td>
                    <td className="py-2 px-5 ">Min. Amount</td>
                    <td className="py-2 px-5 ">Max. Dis. Amount</td>
                    <td className="py-2 px-5 ">Is Amount</td>
                    <td className="py-2 px-5 ">Offer Amount</td>
                    <td className="py-2 px-5 ">Is Percent</td>
                    <td className="py-2 px-5 ">Percentage</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {search === ""
                    ? data.data.map((coupon, index) => {
                      return (
                        <tr key={coupon.id} className="border border-gray-200">
                          <td className="py-2 px-5 text-gray-600">
                            {index + 1}
                          </td>
                          <td className="py-2 px-5 text-gray-600">
                            {coupon.name}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {coupon.isAvailable == 1 ? "Yes" : "No"}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {coupon.minAmount}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {coupon.maxDisAmount}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {coupon.isAmount == 1 ? "Yes" : "No"}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {coupon.offerAmount == null
                              ? "-"
                              : `Rs ${coupon.offerAmount}`}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {coupon.isPercent == 1 ? "Yes" : "No"}
                          </td>

                          <td className="py-2 px-5 text-gray-600">
                            {coupon.offerPercent == null
                              ? "-"
                              : `${coupon.offerPercent} %`}
                          </td>

                          <td className="py-2 px-5 text-gray-600 flex items-center justify-center">
                            <NavLink to={`edit/${coupon.id}`}>
                              <EditButton />
                            </NavLink>
                            <DeleteButton
                              click={() => {
                                toggleIsDelete();
                                setId(coupon.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                    : data.data
                      .filter((coupon) => {
                        if (search === "") {
                          return coupon;
                        } else if (
                          coupon.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return coupon;
                        }
                      })
                      .map((coupon, index) => {
                        return (
                          <tr key={coupon.id} className="border border-gray-200">
                            <td className="py-2 px-5 text-gray-600">
                              {index + 1}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {coupon.name}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {coupon.isAvailable == 1 ? "Yes" : "No"}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {coupon.minAmount}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {coupon.maxDisAmount}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {coupon.isAmount == 1 ? "Yes" : "No"}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {coupon.offerAmount == null
                                ? "-"
                                : `Rs ${coupon.offerAmount}`}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {coupon.isPercent == 1 ? "Yes" : "No"}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              {coupon.offerPercent == null
                                ? "-"
                                : `Rs ${coupon.offerPercent}`}
                            </td>

                            <td className="py-2 flex items-center justify-center px-5 text-gray-600 ">
                              <NavLink to={`edit/${coupon.id}`}>
                                <EditButton />
                              </NavLink>
                              <DeleteButton
                                click={() => {
                                  toggleIsDelete();
                                  setId(coupon.id);
                                }}
                              />
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

export default Coupon;
