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
const AdminManufacturers = lazy(() => import("../app/admin/manufacturers"));
const AdminEmployees = lazy(() => import("../app/admin/employees"));
const AdminServicePacks = lazy(() => import("../app/admin/service-packs"));
const AdminAreas = lazy(() => import("../app/admin/areas"));
const AdminConnectionStatuses = lazy(() => import("../app/admin/connection-statuses"));
const AdminContractStatuses = lazy(() => import("../app/admin/contract-statuses"));
const AdminServiceFormStatuses = lazy(() => import("../app/admin/service-form-statuses"));
const AdminConnectionTypes = lazy(() => import("../app/admin/connection-types"));
const AdminDeviceTypes = lazy(() => import("../app/admin/device-types"));
const AdminDevices = lazy(() => import("../app/admin/devices"));
const AdminCustomers = lazy(() => import("../app/admin/customers"));
const AdminContracts = lazy(() => import("../app/admin/contracts"));
const AdminServiceForms = lazy(() => import("../app/admin/service-forms"));
const AdminCustomerFeedbacks = lazy(() => import("../app/admin/customer-feedbacks"));
const AdminFees = lazy(() => import("../app/admin/fees"));
const AdminImportReceipts = lazy(() => import("../app/admin/import-receipts"));
// USER
const HomePage = lazy(() => import("../app/user/home-page"));
const ServicePack = lazy(() => import("../app/user/service-pack"));
const Membership = lazy(() => import("../app/user/membership"));
const Feedback = lazy(() => import("../app/user/feedback"));
const Register = lazy(() => import("../app/user/register"));

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin">
                    <Redirect to="/admin/dashboard" />
                </Route>
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/dashboard" component={Dashboard} />

                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/stores" component={AdminStores} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/employees" component={AdminEmployees} />

                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/service/customers" component={AdminCustomers} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/service/customer-feedbacks" component={AdminCustomerFeedbacks} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/service/contracts" component={AdminContracts} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/service/service-packs" component={AdminServicePacks} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/service/service-forms" component={AdminServiceForms} />

                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/storage/providers" component={AdminProviders} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/storage/manufacturers" component={AdminManufacturers} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/storage/devices" component={AdminDevices} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/storage/import-receipts" component={AdminImportReceipts} />

                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/attribute/fees" component={AdminFees} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/attribute/connection-types" component={AdminConnectionTypes} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/attribute/device-types" component={AdminDeviceTypes} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/attribute/connection-statuses" component={AdminConnectionStatuses} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/attribute/contract-statuses" component={AdminContractStatuses} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/attribute/service-form-statuses" component={AdminServiceFormStatuses} />
                <AdminRoute roles={[constants.ROLES.ADMIN]} exact path="/admin/attribute/areas" component={AdminAreas} />

                <Route exact path="/admin/login" component={Login} />
                
                <UserRoute exact path="/service-pack" component={ServicePack} />
                <UserRoute exact path="/membership" component={Membership} />
                <UserRoute exact path="/feedback" component={Feedback} />
                <UserRoute exact path="/register" component={Register} />
                <UserRoute exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
            <ToastContainer autoClose={2000} />
        </BrowserRouter>
    );
}

export default Routes;
