import React, { useState, useEffect } from "react";
import Main from "../pages/MainPage/Main";
const AuthRoutes = ({ children } : any ) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
        return children
    } 
    return <Main/>;
}

export default AuthRoutes;