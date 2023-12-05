import axios from "axios";
import React, { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import UrlConstant from "../../constant/url";

const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    console.log("ss")
    return (
        <div className="">You are logged out.</div>
    )
};

export default Logout;
