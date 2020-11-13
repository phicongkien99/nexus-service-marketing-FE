import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    connectionTypes: [],
    isLoading: false, isSucceed: false,
};

const connectionTypeSlice = createSlice({
    name: "connectionTypes",
    initialState: defaultState,
    reducers: {
        setConnectionTypes: (state, action) => {
            state.connectionTypes = action.payload;
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = connectionTypeSlice;

export const { setConnectionTypes, setIsLoading } = actions;

function fetchConnectionTypes(connectionTypes) {
    return async (dispatch) => {
        try {
            if (connectionTypes.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/connectiontype",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setConnectionTypes(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (connectionTypes.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

export { fetchConnectionTypes };

export default reducer;
