import { combineReducers } from "@reduxjs/toolkit";
import adminStore from "./admin/stores/slice";

const rootReducer = combineReducers({
    adminStore,
});

export default rootReducer;
