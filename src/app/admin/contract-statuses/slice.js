import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    contractStatuses: [],
    isLoading: false,
};

const contractStatusSlice = createSlice({
    name: "adminContractStatuses",
    initialState: defaultState,
    reducers: {
        setContractStatuses: (state, action) => {
            state.contractStatuses = action.payload;
        },
        addContractStatus: (state, action) => {
            state.contractStatuses.push(action.payload);
        },
        editContractStatus: (state, action) => {
            state.contractStatuses = state.contractStatuses.map((contractStatus) =>
                contractStatus.Id === action.payload.Id ? action.payload : contractStatus
            );
        },
        removeContractStatus: (state, action) => {
            state.contractStatuses = state.contractStatuses.filter((contractStatus) => contractStatus.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = contractStatusSlice;

export const { setContractStatuses, addContractStatus, editContractStatus, removeContractStatus, setIsLoading } = actions;

function fetchContractStatuses(contractStatuses) {
    return async (dispatch) => {
        try {
            if (contractStatuses.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/contractstatus",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setContractStatuses(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (contractStatuses.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createContractStatus(contractStatus) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/contractstatus",
                method: "post",
                data: contractStatus,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addContractStatus(resp.DataResult));
                }
                toast.success("Create contract status succeed!");
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

function updateContractStatus(contractStatus) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/contractstatus/${contractStatus.Id}`,
                method: "put",
                data: contractStatus,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editContractStatus(resp.DataResult));
                }
                toast.success("Update contract status succeed!");
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

function deleteContractStatus(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/contractstatus/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeContractStatus(resp.DataResult));
                }
                toast.success("Delete contract status succeed!");
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

export { fetchContractStatuses, createContractStatus, updateContractStatus, deleteContractStatus };

export default reducer;
