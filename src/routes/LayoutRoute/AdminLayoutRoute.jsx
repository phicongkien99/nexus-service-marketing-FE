import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";
import PrivateComponent from "../../components/Common/PrivateComponent";

function AdminLayoutRoute({ component: Component, roles, ...rest }) {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <PrivateComponent roles={roles}>
                    <AdminLayout history={matchProps.history}>
                        <Component {...matchProps} />
                    </AdminLayout>
                </PrivateComponent>
            )}
        />
    );
}

export default AdminLayoutRoute;
