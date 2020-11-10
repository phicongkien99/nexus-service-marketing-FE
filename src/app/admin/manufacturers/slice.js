import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    manufacturers: [],
    isLoading: false,
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
            state.manufacturers = state.manufacturers.filter((manufacturer) => manufacturer.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = manufacturerSlice;

export const { setManufacturers, addManufacturer, editManufacturer, removeManufacturer, setIsLoading } = actions;

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
                dispatch(setManufacturers(resp.ListDataResult));
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
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/manufacturer",
                method: "post",
                data: manufacturer,
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(addManufacturer(resp.ListDataResult[0]));
                }
                toast.success("Create manufacturer succeed!");
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

function updateManufacturer(manufacturer) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/manufacturer/${manufacturer.Id}`,
                method: "put",
                data: manufacturer,
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(editManufacturer(resp.ListDataResult[0]));
                }
                toast.success("Update manufacturer succeed!");
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteManufacturer(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/manufacturer/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(removeManufacturer(resp.ListDataResult[0]));
                }
                toast.success("Delete manufacturer succeed!");
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchManufacturers, createManufacturer, updateManufacturer, deleteManufacturer };

export default reducer;
