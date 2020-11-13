import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    servicePacks: [],
    isLoading: false, isSucceed: false,
};

const servicePackSlice = createSlice({
    name: "adminServicePacks",
    initialState: defaultState,
    reducers: {
        setServicePacks: (state, action) => {
            state.servicePacks = action.payload;
        },
        addServicePack: (state, action) => {
            state.servicePacks.push(action.payload);
        },
        editServicePack: (state, action) => {
            state.servicePacks = state.servicePacks.map((servicePack) =>
                servicePack.Id === action.payload.Id ? action.payload : servicePack
            );
        },
        removeServicePack: (state, action) => {
            state.servicePacks = state.servicePacks.filter((servicePack) => servicePack.Id !== action.payload.Id);
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = servicePackSlice;

export const { setServicePacks, addServicePack, editServicePack, removeServicePack, setIsLoading } = actions;

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

function createServicePack(servicePack) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/servicepack",
                method: "post",
                data: servicePack,
            });
            if (resp.IsSuccess) {
                console.log(resp)
                if (resp.DataResult) {
                    dispatch(addServicePack(resp.DataResult));
                }
                toast.success("Create servicePack succeed!");
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

function updateServicePack(servicePack) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/servicepack/${servicePack.Id}`,
                method: "put",
                data: servicePack,
            });
            if (resp.IsSuccess) {
                console.log(resp);
                if (resp.DataResult) {
                    dispatch(editServicePack(resp.DataResult));
                }
                toast.success("Update servicePack succeed!");
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

function deleteServicePack(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/servicepack/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                console.log(resp);
                if (resp.DataResult) {
                    dispatch(removeServicePack(resp.DataResult));
                }
                toast.success("Delete servicePack succeed!");
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

export { fetchServicePacks, createServicePack, updateServicePack, deleteServicePack };

export default reducer;
