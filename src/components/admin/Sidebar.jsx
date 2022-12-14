import { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { GiVerticalBanner } from "react-icons/gi";
import { GoDashboard } from "react-icons/go";
import { HiOutlineTrash } from 'react-icons/hi';
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineCategory, MdOutlineLocalShipping } from "react-icons/md";
import { RiAdvertisementLine, RiCoupon2Line, RiEBike2Line, RiMenu2Fill, RiNotification2Line, RiProductHuntLine } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const logout = async () => {
    await fetch("https://api.hamroelectronics.com.np/api/v1/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItem = [
    {
      name: "Dashboard",
      icon: <GoDashboard className="mr-2" title="Dashboard" />,
      link: "/admin/dashboard",
    },
    {
      name: "Banner",
      icon: <GiVerticalBanner className="mr-2" title="Banner" />,
      link: "/admin/banner",
    },
    {
      name: "Ads",
      icon: <RiAdvertisementLine className="mr-2" title="Ads" />,
      link: "/admin/ad",
    },
    {
      name: "Notification",
      icon: <RiNotification2Line className="mr-2" title="Notification" />,
      link: "/admin/notification",
    },
    {
      name: "Category",
      icon: <BiCategoryAlt className="mr-2" title="Category" />,
      link: "/admin/category",
    },
    {
      name: "Sub Category",
      icon: <MdOutlineCategory className="mr-2" title="Sub Category" />,
      link: "/admin/subcategory",
    },
    {
      name: "Brand",
      icon: <SiBrandfolder className="mr-2" title="Brand" />,
      link: "/admin/brand",
    },
    {
      name: "Products",
      icon: <RiProductHuntLine className="mr-2" title="Products" />,
      link: "/admin/products",
    },
    {
      name: "Shipping",
      icon: <MdOutlineLocalShipping className="mr-2" title="Shipping" />,
      link: "/admin/shipping",
    },
    {
      name: "Coupons",
      icon: <RiCoupon2Line className="mr-2" title="Coupons" />,
      link: "/admin/coupon",
    },
    {
      name: "Orders",
      icon: <RiEBike2Line className="mr-2" title="Orders" />,
      link: "/admin/order",
    },
    {
      name: "Trash",
      icon: <HiOutlineTrash className="mr-2" title="Trash" />,
      link: "/admin/trash",
    },
  ];

  const [sidebar, setSidebar] = useState(sessionStorage.getItem("sidebar"));

  return (
    <>
      <div
        className={`${sidebar ? "w-24" : "w-64"
          } flex-shrink-0 shadow-md min-h-screen max-h-fit bg-gray-50 relative`}
      >
        <button
          className={`absolute top-[3%]  p-2 rounded-full bg-white shadow-md hover:shadow cursor-pointer ${sidebar ? "-right-[20%]" : "-right-[7%]"
            }`}
          onClick={() => {
            if (sessionStorage.getItem("sidebar")) {
              sessionStorage.clear();
            } else {
              sessionStorage.setItem("sidebar", true);
            }
            setSidebar(!sidebar);
          }}
        >
          <RiMenu2Fill className=" text-gray-800 text-lg" />
        </button>
        {sidebar ? (
          <div className="mt-5 mb-3 flex items-center justify-center">
            <div className="w-12 rounded-full h-full">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 object-contain  mx-auto rounded-full border border-gray-100 shadow-lg "
              />
            </div>
          </div>
        ) : (
          <div className="mt-5 mb-3 flex items-center justify-center">
            <div className="w-36 rounded-full h-full">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-36 h-36 object-contain  mx-auto rounded-full border border-gray-100 shadow-lg "
              />
            </div>
          </div>
        )}

        {sidebar ? null : (
          <div>
            <h1 className="text-lg font-bold text-gray-600 text-center">
              Welcome To
            </h1>
            <h1 className="text-sm font-semibold text-gray-400 text-center">
              Admin Panel
            </h1>
          </div>
        )}
        <hr className="mt-3" />
        <div className="mt-2 text-lg">
          {menuItem.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 bg-indigo-500 rounded-md mx-4 py-3 text-white  border-l-indigo-800 shadow-md px-3   flex items-center"
                  : " flex px-3 py-3 my-1 mx-4 items-center hover:bg-indigo-100 hover:rounded-md hover:shadow border-l-4 border-l-transparent hover:border-l-indigo-500"
              }
              to={item.link}
            >
              {item.icon} {sidebar ? null : item.name}
            </NavLink>
          ))}

          <button
            className="flex px-3 py-3 my-1 mx-4 items-center hover:bg-indigo-100 hover:rounded-md hover:shadow border-l-4 border-l-transparent hover:border-l-indigo-500 w-10/12"
            onClick={logout}
          >
            <IoLogOutOutline className="mr-2" />{" "}
            {sidebar ? null : <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
