import React, { lazy } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NotFound from "../components/Layout/NotFound";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./LayoutRoute/AdminLayoutRoute";
const Dashboard = lazy(() => import("../app/admin/dashboard"));

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer autoClose={2000} />
        </BrowserRouter>
    );
}

export default Routes;
