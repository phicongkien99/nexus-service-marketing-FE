import { combineReducers } from "@reduxjs/toolkit";
import adminStore from "./admin/stores/slice";
import adminProvider from "./admin/providers/slice";
import adminArea from "./admin/areas/slice";
import adminFee from "./admin/fees/slice";
import adminConnectionStatus from "./admin/connection-statuses/slice";
import adminContractStatus from "./admin/contract-statuses/slice";
import adminServiceFormStatus from "./admin/service-form-statuses/slice";
import adminConnectionType from "./admin/connection-types/slice";
import adminServicePack from "./admin/service-packs/slice";
import userServicePack from "./slice/service-pack";
import userConnectionType from "./slice/connection-type";

const rootReducer = combineReducers({
    adminStore,
    adminProvider,
    adminArea,
    adminFee,
    adminConnectionStatus,
    adminContractStatus,
    adminServiceFormStatus,
    adminConnectionType,
    adminServicePack,
    userServicePack,
    userConnectionType,
});

export default rootReducer;
