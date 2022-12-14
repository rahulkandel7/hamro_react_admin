import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

//* For toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//* Admin Pages
import PageNotFound from "./pages/404";
import AddBrand from "./pages/admin/brand/AddBrand";
import Brand from "./pages/admin/brand/Brand";
import EditBrand from "./pages/admin/brand/EditBrand";
import AddCategory from "./pages/admin/category/AddCategory";
import AdminCategory from "./pages/admin/category/Category";
import EditCategory from "./pages/admin/category/EditCategory";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import Products from "./pages/admin/product/Products";
import ViewProduct from "./pages/admin/product/ViewProduct";
import AddShipping from "./pages/admin/shipping/AddShipping";
import EditShipping from "./pages/admin/shipping/EditShipping";
import Shipping from "./pages/admin/shipping/Shipping";
import AddSubCategory from "./pages/admin/subcategory/AddSubCategory";
import EditSubCategory from "./pages/admin/subcategory/EditSubCategory";
import SubCategory from "./pages/admin/subcategory/SubCategory";

import AddBanner from "./pages/admin/banner/AddBanner";
import Banner from "./pages/admin/banner/Banner";
import EditBanner from "./pages/admin/banner/EditBanner";
import AddCoupon from "./pages/admin/coupon/AddCoupon";
import Coupon from "./pages/admin/coupon/Coupon";
import EditCoupon from "./pages/admin/coupon/EditCoupon";

import App from "./App";
import ScrollToTop from "./components/utils/ScrollToTop";
import AddAds from "./pages/admin/ads/AddAds";
import Ads from "./pages/admin/ads/Ads";
import EditAds from "./pages/admin/ads/EditAds";
import AddNotification from "./pages/admin/notification/AddNotification";
import EditNotification from "./pages/admin/notification/EditNotification";
import Notification from "./pages/admin/notification/Notification";
import Order from "./pages/admin/orders/Order";
import PrintOrder from "./pages/admin/orders/PrintOrder";
import ViewOrder from "./pages/admin/orders/viewOrder";
import Trash from "./pages/admin/trash/Trash";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ToastContainer />
      {/* <AdminLayout> */}
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Admin Route */}
          <Route path="admin">
            <Route path="dashboard" element={<Dashboard />} />
            {/* banner Route */}
            <Route path="banner">
              <Route index element={<Banner />} />
              <Route path="create" element={<AddBanner />} />
              <Route path="edit/:id" element={<EditBanner />} />
            </Route>
            {/* Category Route */}
            <Route path="category">
              <Route index element={<AdminCategory />} />
              <Route path="create" element={<AddCategory />} />
              <Route path="edit/:id" element={<EditCategory />} />
            </Route>
            {/* Sub Category Route */}
            <Route path="subcategory">
              <Route index element={<SubCategory />} />
              <Route path="create" element={<AddSubCategory />} />
              <Route path="edit/:id" element={<EditSubCategory />} />
            </Route>
            {/* Brand Route */}
            <Route path="brand">
              <Route index element={<Brand />} />
              <Route path="create" element={<AddBrand />} />
              <Route path="edit/:id" element={<EditBrand />} />
            </Route>
            {/* Products Route */}
            <Route path="products">
              <Route index element={<Products />} />
              <Route path="create" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="view/:id" element={<ViewProduct />} />
            </Route>
            {/* Shipping Route */}
            <Route path="shipping">
              <Route index element={<Shipping />} />
              <Route path="create" element={<AddShipping />} />
              <Route path="edit/:id" element={<EditShipping />} />
            </Route>
            {/* Coupon Route */}
            <Route path="coupon">
              <Route index element={<Coupon />} />
              <Route path="create" element={<AddCoupon />} />
              <Route path="edit/:id" element={<EditCoupon />} />
            </Route>

            {/* Notification Route */}
            <Route path="notification">
              <Route index element={<Notification />} />
              <Route path="create" element={<AddNotification />} />
              <Route path="edit/:id" element={<EditNotification />} />
            </Route>

            {/* Ads Route */}
            <Route path="ad">
              <Route index element={<Ads />} />
              <Route path="create" element={<AddAds />} />
              <Route path="edit/:id" element={<EditAds />} />
            </Route>

            {/* Order Route */}
            <Route path="order">
              <Route index element={<Order />} />
              <Route path="view/:id" element={<ViewOrder />} />
              <Route path="print/:id" element={<PrintOrder />} />
            </Route>

            {/* Trash Route */}
            <Route path="trash">
              <Route index element={<Trash />} />
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
      {/* </AdminLayout> */}
    </Router>
  </React.StrictMode>
);
