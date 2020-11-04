import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    connectionTypes: [],
    isLoading: false,
};

const connectionTypeSlice = createSlice({
    name: "connectionTypes",
    initialState: defaultState,
    reducers: {
        setConnectionTypes: (state, action) => {
            state.connectionTypes = action.payload;
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
            if (resp.data.IsSuccess) {
                dispatch(setConnectionTypes(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
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
