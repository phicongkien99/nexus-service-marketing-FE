import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";
import NotFound from "../../components/Layout/NotFound";
import jwt from "jsonwebtoken";

function AdminLayoutRoute({ component: Component, ...rest }) {
    const userInfo = window.userInfo;
    
    if (!userInfo) {
        const token = window.localStorage.getItem("token");
        try {
            const decoded = jwt.decode(token, process.env.REACT_APP_JWT_SECRET);
        } catch (e) {
            
        }
    }
    
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <AdminLayout>
                    <Component {...matchProps} />
                </AdminLayout>
            )}
        />
    );
}

export default AdminLayoutRoute;