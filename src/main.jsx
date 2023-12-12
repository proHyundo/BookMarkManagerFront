// libraries import
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// local import
import RootLayout from "./routes/RootLayout";
import Home from "./routes/Home";
import Manage from "./routes/Manage";
import Login, { action as loginAction } from "./routes/Login";
import { accessTokenLoader } from "/src/utils/GetAccessToken";
// import { loader as folderListLoader } from "/src/routes/Manage";
import { action as logoutAction } from "/src/components/HeaderMenu/HeaderMenu";
import KakaoLogin from "./routes/Kakao/KakaoLogin";
// styles import
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: (
            <RootLayout>
                <div>Error Page!!! To be replace with ErrorComponent</div>
            </RootLayout>
        ),
        id: "root",
        loader: accessTokenLoader,
        children: [
            { path: "/", index: true, element: <Home /> },
            { path: "/login", element: <Login />, action: loginAction },
            { path: "/manage", element: <Manage /> },
            { path: "/logout", action: logoutAction },
            { path: "/login/kakao/callback", element: <KakaoLogin /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
