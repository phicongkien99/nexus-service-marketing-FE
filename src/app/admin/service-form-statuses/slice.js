import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    serviceFormStatuses: [],
    isLoading: false,
};

const serviceFormStatusSlice = createSlice({
    name: "adminServiceFormStatuses",
    initialState: defaultState,
    reducers: {
        setServiceFormStatuses: (state, action) => {
            state.serviceFormStatuses = action.payload;
        },
        addServiceFormStatus: (state, action) => {
            state.serviceFormStatuses.push(action.payload);
        },
        editServiceFormStatus: (state, action) => {
            state.serviceFormStatuses = state.serviceFormStatuses.map((serviceFormStatus) =>
                serviceFormStatus.id === action.payload.id ? action.payload : serviceFormStatus
            );
        },
        removeServiceFormStatus: (state, action) => {
            state.serviceFormStatuses = state.serviceFormStatuses.filter((serviceFormStatus) => serviceFormStatus.id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = serviceFormStatusSlice;

export const { setServiceFormStatuses, addServiceFormStatus, editServiceFormStatus, removeServiceFormStatus, setIsLoading } = actions;

function fetchServiceFormStatuses(serviceFormStatuses) {
    return async (dispatch) => {
        try {
            if (serviceFormStatuses.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/serviceformstatus",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setServiceFormStatuses(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (serviceFormStatuses.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createServiceFormStatus(serviceFormStatus) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/serviceformstatus",
                method: "post",
                data: serviceFormStatus,
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(addServiceFormStatus(resp.ListDataResult[0]));
                }
                toast.success("Create service form status succeed!");
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

function updateServiceFormStatus(serviceFormStatus) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/serviceformstatus/${serviceFormStatus.id}`,
                method: "put",
                data: serviceFormStatus,
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(editServiceFormStatus(resp.ListDataResult[0]));
                }
                toast.success("Update service form status succeed!");
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

function deleteServiceFormStatus(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/serviceformstatus/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(removeServiceFormStatus(resp.ListDataResult[0]));
                }
                toast.success("Delete service form status succeed!");
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

export { fetchServiceFormStatuses, createServiceFormStatus, updateServiceFormStatus, deleteServiceFormStatus };

export default reducer;
