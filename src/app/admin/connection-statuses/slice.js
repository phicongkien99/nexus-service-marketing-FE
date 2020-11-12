import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    connectionStatuses: [],
    isLoading: false,
};

const connectionStatusSlice = createSlice({
    name: "adminConnectionStatuses",
    initialState: defaultState,
    reducers: {
        setConnectionStatuses: (state, action) => {
            state.connectionStatuses = action.payload;
        },
        addConnectionStatus: (state, action) => {
            state.connectionStatuses.push(action.payload);
        },
        editConnectionStatus: (state, action) => {
            state.connectionStatuses = state.connectionStatuses.map((connectionStatus) =>
                connectionStatus.Id === action.payload.Id ? action.payload : connectionStatus
            );
        },
        removeConnectionStatus: (state, action) => {
            state.connectionStatuses = state.connectionStatuses.filter((connectionStatus) => connectionStatus.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = connectionStatusSlice;

export const { setConnectionStatuses, addConnectionStatus, editConnectionStatus, removeConnectionStatus, setIsLoading } = actions;

function fetchConnectionStatuses(connectionStatuses) {
    return async (dispatch) => {
        try {
            if (connectionStatuses.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/connectionstatus",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setConnectionStatuses(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (connectionStatuses.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createConnectionStatus(connectionStatus) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/connectionstatus",
                method: "post",
                data: connectionStatus,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addConnectionStatus(resp.DataResult));
                }
                toast.success("Create connection status succeed!");
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

function updateConnectionStatus(connectionStatus) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/connectionstatus/${connectionStatus.Id}`,
                method: "put",
                data: connectionStatus,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editConnectionStatus(resp.DataResult));
                }
                toast.success("Update connection status succeed!");
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

function deleteConnectionStatus(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/connectionstatus/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeConnectionStatus(resp.DataResult));
                }
                toast.success("Delete connection status succeed!");
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

export { fetchConnectionStatuses, createConnectionStatus, updateConnectionStatus, deleteConnectionStatus };

export default reducer;
