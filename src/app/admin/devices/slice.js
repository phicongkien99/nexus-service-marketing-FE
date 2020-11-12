import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    devices: [],
    isLoading: false,
};

const deviceSlice = createSlice({
    name: "adminDevices",
    initialState: defaultState,
    reducers: {
        setDevices: (state, action) => {
            state.devices = action.payload;
        },
        addDevice: (state, action) => {
            state.devices.push(action.payload);
        },
        editDevice: (state, action) => {
            state.devices = state.devices.map((device) =>
                device.Id === action.payload.Id ? action.payload : device
            );
        },
        removeDevice: (state, action) => {
            state.devices = state.devices.filter((device) => device.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = deviceSlice;

export const { setDevices, addDevice, editDevice, removeDevice, setIsLoading } = actions;

function fetchDevices(devices) {
    return async (dispatch) => {
        try {
            if (devices.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/device",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setDevices(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (devices.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createDevice(device) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/device",
                method: "post",
                data: device,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addDevice(resp.DataResult));
                }
                toast.success("Create device succeed!");
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

function updateDevice(device) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/device/${device.Id}`,
                method: "put",
                data: device,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editDevice(resp.DataResult));
                }
                toast.success("Update device succeed!");
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

function deleteDevice(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/device/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeDevice(resp.DataResult));
                }
                toast.success("Delete device succeed!");
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

export { fetchDevices, createDevice, updateDevice, deleteDevice };

export default reducer;
