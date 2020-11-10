import React, { lazy } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import NotFound from "../components/Layout/NotFound";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./LayoutRoute/AdminLayoutRoute";
import UserRoute from "./LayoutRoute/UserLayoutRoute";
import Login from "../app/admin/login";
import constants from "../utils/constants";
// ADMIN
const Dashboard = lazy(() => import("../app/admin/dashboard"));
const AdminStores = lazy(() => import("../app/admin/stores"));
const AdminProviders = lazy(() => import("../app/admin/providers"));
const AdminServicePacks = lazy(() => import("../app/admin/service-packs"));
const AdminAreas = lazy(() => import("../app/admin/areas"));
const AdminConnectionStatuses = lazy(() => import("../app/admin/connection-statuses"));
const AdminServiceFormStatuses = lazy(() => import("../app/admin/service-form-statuses"));
const AdminConnectionTypes = lazy(() => import("../app/admin/connection-types"));
const AdminFees = lazy(() => import("../app/admin/fees"));
// USER
const HomePage = lazy(() => import("../app/user/home-page"));
const ServicePack = lazy(() => import("../app/user/service-pack"));
const Membership = lazy(() => import("../app/user/membership"));
const Feedback = lazy(() => import("../app/user/feedback"));

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin">
                    <Redirect to="/admin/dashboard" />
                </Route>
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/dashboard" component={Dashboard} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/stores" component={AdminStores} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/providers" component={AdminProviders} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/fees" component={AdminFees} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/connection-types" component={AdminConnectionTypes} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/connection-statuses" component={AdminConnectionStatuses} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/service-form-statuses" component={AdminServiceFormStatuses} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/areas" component={AdminAreas} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/service-packs" component={AdminServicePacks} />
                <Route exact path="/admin/login" component={Login} />
                <UserRoute exact path="/service-pack" component={ServicePack} />
                <UserRoute exact path="/membership" component={Membership} />
                <UserRoute exact path="/feedback" component={Feedback} />
                <UserRoute exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer autoClose={2000} />
        </BrowserRouter>
    );
}

export default Routes;
