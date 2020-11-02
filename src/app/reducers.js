import { combineReducers } from "@reduxjs/toolkit";
import adminStore from "./admin/stores/slice";
import adminProvider from "./admin/providers/slice";
import adminCategory from "./admin/categories/slice";
import adminArea from "./admin/areas/slice";

const rootReducer = combineReducers({
    adminStore,
    adminProvider,
    adminCategory,
    adminArea,
});

export default rootReducer;
