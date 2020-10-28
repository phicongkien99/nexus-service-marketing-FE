import React, { lazy } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NotFound from "../components/Layout/NotFound";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./LayoutRoute/AdminLayoutRoute";
import UserRoute from "./LayoutRoute/UserLayoutRoute";
const Dashboard = lazy(() => import("../app/admin/dashboard"));
const HomePage = lazy(() => import("../app/user/home-page"));

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
                <UserRoute exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer autoClose={2000} />
        </BrowserRouter>
    );
}

export default Routes;
