import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {

};

const registerSlice = createSlice({
    name: "userRegister",
    initialState: defaultState,
    reducers: {
        
    },
});

const { actions, reducer } = registerSlice;

export const { } = actions;

export { };

export default reducer;
