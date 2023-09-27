import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import RootLayout from "./routes/RootLayout";
import Home from "./routes/Home";
import Manage from "./routes/Manage";
import Login, { action as loginAction } from "./routes/Login";
import { accessTokenLoader } from "/src/utils/GetAccessToken";
import { loader as folderListLoader } from "/src/routes/Manage";
import { action as logoutAction } from "/src/components/HeaderMenu/HeaderMenu"
import KakaoLogin from "./routes/KakaoLogin";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: accessTokenLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login />, action: loginAction },
      { path: "/manage", element: <Manage />, loader: folderListLoader},
      { path: "/logout", action: logoutAction },
      { path: "/login/callback", element: <KakaoLogin />}
    ],
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
