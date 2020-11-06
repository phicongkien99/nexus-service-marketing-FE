import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    servicePacks: [],
    isLoading: false,
};

const servicePackSlice = createSlice({
    name: "servicePacks",
    initialState: defaultState,
    reducers: {
        setServicePacks: (state, action) => {
            state.servicePacks = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = servicePackSlice;

export const { setServicePacks, setIsLoading } = actions;

function fetchServicePacks(servicePacks) {
    return async (dispatch) => {
        try {
            if (servicePacks.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/servicepack",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setServicePacks(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (servicePacks.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

export { fetchServicePacks };

export default reducer;
