import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    connectionTypes: [],
    isLoading: false,
};

const connectionTypeSlice = createSlice({
    name: "adminConnectionTypes",
    initialState: defaultState,
    reducers: {
        setConnectionTypes: (state, action) => {
            state.connectionTypes = action.payload;
        },
        addConnectionType: (state, action) => {
            state.connectionTypes.push(action.payload);
        },
        editConnectionType: (state, action) => {
            state.connectionTypes = state.connectionTypes.map((connectionType) =>
                connectionType.id === action.payload.id ? action.payload : connectionType
            );
        },
        removeConnectionType: (state, action) => {
            state.connectionTypes = state.connectionTypes.filter((connectionType) => connectionType.id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = connectionTypeSlice;

export const { setConnectionTypes, addConnectionType, editConnectionType, removeConnectionType, setIsLoading } = actions;

function fetchConnectionTypes(connectionTypes) {
    return async (dispatch) => {
        try {
            if (connectionTypes.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/connectionType",
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

function createConnectionType(connectionType) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/connectionType",
                method: "post",
                data: connectionType,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(addConnectionType(resp.data.ListDataResult[0]));
                }
                toast.success("Create connection type succeed!");
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

function updateConnectionType(connectionType) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/connectionType/${connectionType.id}`,
                method: "put",
                data: connectionType,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(editConnectionType(resp.data.ListDataResult[0]));
                }
                toast.success("Update connection type succeed!");
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteConnectionType(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/connectionType/${id}`,
                method: "delete",
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(removeConnectionType(resp.data.ListDataResult[0]));
                }
                toast.success("Delete connection type succeed!");
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchConnectionTypes, createConnectionType, updateConnectionType, deleteConnectionType };

export default reducer;
