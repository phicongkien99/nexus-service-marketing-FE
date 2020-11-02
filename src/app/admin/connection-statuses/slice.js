import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    connectionStatuses: [],
    isLoading: false,
};

const connectionStatusSlice = createSlice({
    name: "connectionStatuses",
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
                connectionStatus.id === action.payload.id ? action.payload : connectionStatus
            );
        },
        removeConnectionStatus: (state, action) => {
            state.connectionStatuses = state.connectionStatuses.filter(
                (connectionStatus) => connectionStatus.id !== action.payload.id
            );
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
            //TODO: Call api
            const resp = {
                data: [],
            };
            dispatch(setConnectionStatuses(resp.data));
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Get connection statuses failed!");
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
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(addConnectionStatus(resp.data));
            toast.success("Create connection status succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Create connection status failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function updateConnectionStatus(connectionStatus) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(editConnectionStatus(resp.data));
            toast.success("Update connection status succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Update connection status failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteConnectionStatus(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(removeConnectionStatus(resp.data));
            toast.success("Delete connection status succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Delete connection status failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchConnectionStatuses, createConnectionStatus, updateConnectionStatus, deleteConnectionStatus };

export default reducer;
