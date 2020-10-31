import { combineReducers } from "@reduxjs/toolkit";
import adminStore from "./admin/stores/slice";
import adminProvider from "./admin/providers/slice";
import adminCategory from "./admin/categories/slice";

const rootReducer = combineReducers({
    adminStore,
    adminProvider,
    adminCategory,
});

export default rootReducer;
