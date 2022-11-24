import { NavLink, useNavigate } from "react-router-dom";
import { GoDashboard } from "react-icons/go";
import { GiVerticalBanner } from "react-icons/gi";
import { RiAdvertisementLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { RiEBike2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";

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
      icon: <GoDashboard className="mr-2" />,
      link: "/admin/dashboard",
    },
    {
      name: "Banner",
      icon: <GiVerticalBanner className="mr-2" />,
      link: "/admin/banner",
    },
    {
      name: "Ads",
      icon: <RiAdvertisementLine className="mr-2" />,
      link: "/admin/ad",
    },
    {
      name: "Category",
      icon: <BiCategoryAlt className="mr-2" />,
      link: "/admin/category",
    },
    {
      name: "Sub Category",
      icon: <MdOutlineCategory className="mr-2" />,
      link: "/admin/subcategory",
    },
    {
      name: "Brand",
      icon: <SiBrandfolder className="mr-2" />,
      link: "/admin/brand",
    },
    {
      name: "Products",
      icon: <RiProductHuntLine className="mr-2" />,
      link: "/admin/products",
    },
    {
      name: "Shipping",
      icon: <MdOutlineLocalShipping className="mr-2" />,
      link: "/admin/shipping",
    },
    {
      name: "Coupons",
      icon: <RiCoupon2Line className="mr-2" />,
      link: "/admin/coupon",
    },
    {
      name: "Orders",
      icon: <RiEBike2Line className="mr-2" />,
      link: "/admin/order",
    },
  ];

  return (
    <>
      <div className="w-64 flex-shrink-0 shadow-md min-h-screen max-h-fit bg-gray-50">
        <div className="mt-5 mb-3 flex items-center justify-center">
          <div className="w-36 rounded-full h-full">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-28 h-28 object-fill  mx-auto rounded-full border border-gray-100 shadow-lg "
            />
          </div>
        </div>

        <h1 className="text-lg font-bold text-gray-600 text-center">
          Welcome To
        </h1>
        <h1 className="text-sm font-semibold text-gray-400 text-center">
          Admin Panel
        </h1>
        <hr className="mt-3" />
        <div className="mt-2 text-lg">
          {menuItem.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 bg-indigo-500 rounded-md mx-4 py-3 text-white  border-l-indigo-800 shadow-md px-3   flex items-center"
                  : " flex px-3 py-3 my-1 mx-4 items-center hover:bg-indigo-100 hover:rounded-md hover:shadow border-l-4 border-l-transparent hover:border-l-indigo-500"
              }
              to={item.link}
            >
              {item.icon} {item.name}
            </NavLink>
          ))}

          <button
            className="flex px-3 py-3 my-1 mx-4 items-center hover:bg-indigo-100 hover:rounded-md hover:shadow border-l-4 border-l-transparent hover:border-l-indigo-500 w-10/12"
            onClick={logout}
          >
            <IoLogOutOutline className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
