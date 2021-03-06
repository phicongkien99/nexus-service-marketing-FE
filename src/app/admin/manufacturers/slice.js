import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    manufacturers: [],
    isLoading: false, isSucceed: false,
};

const manufacturerSlice = createSlice({
    name: "adminManufacturers",
    initialState: defaultState,
    reducers: {
        setManufacturers: (state, action) => {
            state.manufacturers = action.payload;
        },
        addManufacturer: (state, action) => {
            state.manufacturers.push(action.payload);
        },
        editManufacturer: (state, action) => {
            state.manufacturers = state.manufacturers.map((manufacturer) =>
                manufacturer.Id === action.payload.Id ? action.payload : manufacturer
            );
        },
        removeManufacturer: (state, action) => {
            state.manufacturers = state.manufacturers.filter((manufacturer) => manufacturer.Id !== action.payload.Id);
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = manufacturerSlice;

export const { setManufacturers, addManufacturer, editManufacturer, removeManufacturer, setIsLoading, setIsSucceed } = actions;

function fetchManufacturers(manufacturers) {
    return async (dispatch) => {
        try {
            if (manufacturers.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/manufacturer",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setManufacturers(resp.ListDataResult));dispatch(setIsSucceed(false));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (manufacturers.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createManufacturer(manufacturer) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/manufacturer",
                method: "post",
                data: manufacturer,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addManufacturer(resp.DataResult));dispatch(setIsSucceed(true));
                }
                toast.success("Create manufacturer succeed!");
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

function updateManufacturer(manufacturer) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/manufacturer/${manufacturer.Id}`,
                method: "put",
                data: manufacturer,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editManufacturer(resp.DataResult));dispatch(setIsSucceed(true));
                }
                toast.success("Update manufacturer succeed!");
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

function deleteManufacturer(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/manufacturer/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeManufacturer(resp.DataResult));dispatch(setIsSucceed(true));
                }
                toast.success("Delete manufacturer succeed!");
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

export { fetchManufacturers, createManufacturer, updateManufacturer, deleteManufacturer };

export default reducer;
