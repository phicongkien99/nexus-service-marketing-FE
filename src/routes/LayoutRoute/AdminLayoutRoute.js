import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";
import NotFound from "../../components/Layout/NotFound";

function AdminLayoutRoute({ component: Component, ...rest }) {
    const isLogin = true;
    if (!isLogin) {
        return <NotFound />
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