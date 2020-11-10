import React from "react";
import NotFound from "../Layout/NotFound";
import jwt from "jsonwebtoken";

function PrivateComponent({ children, roles }) {
    let userInfo = window.userInfo;

    if (!userInfo) {
        const token = window.localStorage.getItem("token");
        try {
            const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
            window.userInfo = decoded.Employee;
            userInfo = decoded.Employee;
            if (roles.includes(userInfo.Role)) {
                return children;
            }
        } catch (e) {
            console.error(e);
        }
    } else {
        if (roles.includes(userInfo.Role)) {
            return children;
        }
    }

    return <NotFound />
}

export default PrivateComponent;
