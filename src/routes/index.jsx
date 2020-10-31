import React, { lazy } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import NotFound from "../components/Layout/NotFound";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./LayoutRoute/AdminLayoutRoute";
import UserRoute from "./LayoutRoute/UserLayoutRoute";
const Dashboard = lazy(() => import("../app/admin/dashboard"));
const HomePage = lazy(() => import("../app/user/home-page"));
const AdminStores = lazy(() => import("../app/admin/stores"));
const AdminProviders = lazy(() => import("../app/admin/providers"));
const AdminCategories = lazy(() => import("../app/admin/categories"));
const ServicePack = lazy(() => import("../app/user/service-pack"));

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin">
                    <Redirect to="/admin/dashboard" />
                </Route>
                <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
                <AdminRoute exact path="/admin/stores" component={AdminStores} />
                <AdminRoute exact path="/admin/providers" component={AdminProviders} />
                <AdminRoute exact path="/admin/categories" component={AdminCategories} />
                <UserRoute exact path="/service-pack" component={ServicePack} />
                <UserRoute exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer autoClose={2000} />
        </BrowserRouter>
    );
}

export default Routes;
