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
  return (
    <>
      <div className="w-72 shadow-md min-h-screen max-h-fit bg-gray-50">
        <div className="my-5 flex items-center mx-5">
          <div className="w-36   rounded-full h-full">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-28 h-28 object-fill   rounded-full border border-gray-100 shadow-lg "
            />
          </div>
          <div className="mx-4">
            <h1 className="text-lg font-bold text-gray-600">User Name</h1>
            <h1 className="text-xs font-semibold text-gray-400">Admin Panel</h1>
          </div>
        </div>
        <div className="mt-10">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/dashboard"
          >
            <i className="ri-dashboard-3-line mr-2"></i> Dashboard
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/banner"
          >
            <i className="ri-product-hunt-line mr-2"></i>Banner
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/category"
          >
            <i className="ri-product-hunt-line mr-2"></i>Category
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/subcategory"
          >
            <i className="ri-product-hunt-line mr-2"></i>Sub Category
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/brand"
          >
            <i className="ri-product-hunt-line mr-2"></i>Brand
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/products"
          >
            <i className="ri-product-hunt-line mr-2"></i>Product
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/shipping"
          >
            <i className="ri-product-hunt-line mr-2"></i>Shipping
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/coupon"
          >
            <i className="ri-product-hunt-line mr-2"></i>Coupon
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-l-4  border-l-red-500 px-3 my-5 text-red-500 flex items-center"
                : " flex px-3 my-5 items-center hover:text-red-500"
            }
            to="/admin/ad"
          >
            <i className="ri-product-hunt-line mr-2"></i>Ads
          </NavLink>

          <button
            className="flex px-3 my-5 items-center hover:text-red-500"
            onClick={logout}
          >
            <i className="ri-logout-line mr-2"></i>Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
