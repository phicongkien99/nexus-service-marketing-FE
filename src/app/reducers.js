import { combineReducers } from "@reduxjs/toolkit";
import adminStore from "./admin/stores/slice";
import adminProvider from "./admin/providers/slice";
import adminManufacturer from "./admin/manufacturers/slice";
import adminEmployee from "./admin/employees/slice";
import adminArea from "./admin/areas/slice";
import adminFee from "./admin/fees/slice";
import adminConnectionStatus from "./admin/connection-statuses/slice";
import adminContractStatus from "./admin/contract-statuses/slice";
import adminServiceFormStatus from "./admin/service-form-statuses/slice";
import adminConnectionType from "./admin/connection-types/slice";
import adminDeviceType from "./admin/device-types/slice";
import adminDevice from "./admin/devices/slice";
import adminCustomer from "./admin/customers/slice";
import adminCustomerFeedback from "./admin/customer-feedbacks/slice";
import adminContract from "./admin/contracts/slice";
import adminServicePack from "./admin/service-packs/slice";
import adminServiceForm from "./admin/service-forms/slice";
import adminImportReceipt from "./admin/import-receipts/slice";
import userServicePack from "./slice/service-pack";
import userConnectionType from "./slice/connection-type";

const rootReducer = combineReducers({
    adminStore,
    adminProvider,
    adminEmployee,
    adminArea,
    adminFee,
    adminManufacturer,
    adminConnectionStatus,
    adminContractStatus,
    adminServiceFormStatus,
    adminConnectionType,
    adminDeviceType,
    adminServicePack,
    adminDevice,
    adminCustomer,
    adminContract,
    adminCustomerFeedback,
    adminImportReceipt,
    adminServiceForm,
    userServicePack,
    userConnectionType,
});

export default rootReducer;
