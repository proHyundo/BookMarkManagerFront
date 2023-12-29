// hooks
import React, { useState } from "react";
import { Form, Link, redirect, useRouteLoaderData } from "react-router-dom";
// components
import DropdownLink from "../DropdownLink/DropdownLink";
import { IoIosClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
// styles

export function HeaderMenu({ links }) {
    const [isBugerMenuOpen, setIsBugerMenuOpen] = useState(false);
    const accessToken = useRouteLoaderData("root");

    const headerMenuItems = links.map((link) => {
        if (link.links) {
            return <DropdownLink links={link.links} label={link.label} />;
        }

        return (
            <Link key={link.label} to={link.link} className="p-4">
                {link.label}
            </Link>
        );
    });

    return (
        <header className="w-full flex justify-between items-center h-20 px-10 wrap bg-[#fafbfb]">
            <div id="div-header-left" className="flex items-center pr-14 h-full">
                <div id="div-header-logo" className="min-w-32 max-w-40">
                    <Link to="/">
                        <img src="/src/assets/BrandLogo.png" alt="Brand Logo Image" className="w-auto" />
                    </Link>
                </div>
            </div>

            {/* Show bugermenu icon only screen size under md */}
            <div className="md:hidden">
                <button onClick={() => setIsBugerMenuOpen(!isBugerMenuOpen)}>
                    {isBugerMenuOpen ? <IoIosClose className="h-6 w-6" /> : <IoMdMenu className="h-6 w-6" />}
                </button>
            </div>

            {/* Hide header menu when screen size under md */}
            <nav id="div-header-right" className="md:flex justify-between items-center hidden">
                {headerMenuItems}
                {accessToken && (
                    <Form method="post" action={`/logout`} className="p-4">
                        <button type="submit">Logout</button>
                    </Form>
                )}
                {!accessToken && (
                    <Link to="/login" type="button" className="p-4">
                        Login
                    </Link>
                )}
            </nav>

            {/* Open bugermenu modal when bugermenu icon clicked */}
            {isBugerMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 md:hidden"
                    onClick={() => setIsBugerMenuOpen(false)}
                >
                    <div
                        className="fixed right-0 top-0 w-1/2 sm:w-1/2 h-full bg-white p-5 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setIsBugerMenuOpen(false)} className="block w-full mb-4">
                            <IoIosClose className="h-10 w-10 ml-auto" />
                        </button>
                        <div className="flex flex-col ">
                            {headerMenuItems}
                            {accessToken && (
                                <Form method="post" action={`/logout`} className="p-4">
                                    <button type="submit">Logout</button>
                                </Form>
                            )}
                            {!accessToken && (
                                <Link to="/login" className="p-4">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export async function action(data) {
    const response = await fetch(import.meta.env.VITE_APP_SERVER + "/api/v1/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userAccessToken"),
        },
        credentials: "include",
    });
    if (response.status === 200) {
        localStorage.removeItem("userAccessToken");
        alert("로그아웃 되었습니다.");
    }
    return redirect("/");
}
