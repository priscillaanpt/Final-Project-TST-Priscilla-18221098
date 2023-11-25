import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../pages/MainPage/Main";
import Login from "../pages/Login/Login";
import Order from "../pages/Order/Order";
import Product from "../pages/Product/Product";
import Profile from "../pages/Profile/Profile";
import Reviews from "../pages/Reviews/Reviews";

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
    path: "/orders",
    element: <Order />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
]);

const Routes = () => {
  return <RouterProvider router={routeList} />;
};

export default Routes;
