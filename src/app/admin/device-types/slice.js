import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    deviceTypes: [],
    isLoading: false,
};

const deviceTypeSlice = createSlice({
    name: "adminDeviceTypes",
    initialState: defaultState,
    reducers: {
        setDeviceTypes: (state, action) => {
            state.deviceTypes = action.payload;
        },
        addDeviceType: (state, action) => {
            state.deviceTypes.push(action.payload);
        },
        editDeviceType: (state, action) => {
            state.deviceTypes = state.deviceTypes.map((deviceType) =>
                deviceType.Id === action.payload.Id ? action.payload : deviceType
            );
        },
        removeDeviceType: (state, action) => {
            state.deviceTypes = state.deviceTypes.filter((deviceType) => deviceType.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = deviceTypeSlice;

export const { setDeviceTypes, addDeviceType, editDeviceType, removeDeviceType, setIsLoading } = actions;

function fetchDeviceTypes(deviceTypes) {
    return async (dispatch) => {
        try {
            if (deviceTypes.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/deviceType",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setDeviceTypes(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (deviceTypes.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createDeviceType(deviceType) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/deviceType",
                method: "post",
                data: deviceType,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addDeviceType(resp.DataResult));
                }
                toast.success("Create device type succeed!");
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

function updateDeviceType(deviceType) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/deviceType/${deviceType.Id}`,
                method: "put",
                data: deviceType,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editDeviceType(resp.DataResult));
                }
                toast.success("Update device type succeed!");
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

function deleteDeviceType(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/deviceType/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeDeviceType(resp.DataResult));
                }
                toast.success("Delete device type succeed!");
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

export { fetchDeviceTypes, createDeviceType, updateDeviceType, deleteDeviceType };

export default reducer;
