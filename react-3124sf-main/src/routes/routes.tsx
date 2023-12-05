import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../pages/MainPage/Main";
import Login from "../pages/Login/Login";
import Order from "../pages/Order/Order";
import Product from "../pages/Product/Product";
import Profile from "../pages/Profile/Profile";
import Reviews from "../pages/Reviews/Reviews";
import ProductForm from "../pages/Product/ProductForm";
import ReviewForm from "../pages/Reviews/ReviewForm";
import OrderForm from "../pages/Order/OrderForm";
import AuthRoutes from "./authroutes";
import Logout from "../pages/Logout/Logout";
import Register from "../pages/Login/Register";
import Pelanggan from "../pages/Pelanggan/Pelanggan";
import PelangganForm from "../pages/Pelanggan/PelangganForm";
const routeList = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/orders",
    element: <AuthRoutes><Order /></AuthRoutes> ,
  },
  {
    path: "/orders/form",
    element: <AuthRoutes><OrderForm /></AuthRoutes>,
  },
  {
    path: "/products",
    element:  <AuthRoutes><Product /></AuthRoutes>,
  },
  {
    path: "/products/form",
    element:  <AuthRoutes><ProductForm /></AuthRoutes>,
  },
  {
    path: "/profile",
    element:  <AuthRoutes><Profile /></AuthRoutes>,
  },
  {
    path: "/reviews",
    element:  <AuthRoutes><Reviews /></AuthRoutes>,
  },
  {
    path: "/reviews/form",
    element: <AuthRoutes><ReviewForm /></AuthRoutes>,
  },
  {
    path: "/pelanggan",
    element: <AuthRoutes> <Pelanggan/></AuthRoutes>,
  },
  {
    path: "/pelanggan/form",
    element:  <AuthRoutes><PelangganForm /></AuthRoutes>,
  },
]);

const Routes = () => {
  return <RouterProvider router={routeList} />;
};

export default Routes;
