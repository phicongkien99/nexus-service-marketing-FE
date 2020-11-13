import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    importReceipts: [],
    isLoading: false,
};

const importReceiptSlice = createSlice({
    name: "adminImportReceipts",
    initialState: defaultState,
    reducers: {
        setImportReceipts: (state, action) => {
            state.importReceipts = action.payload;
        },
        addImportReceipt: (state, action) => {
            state.importReceipts.push(action.payload);
        },
        editImportReceipt: (state, action) => {
            state.importReceipts = state.importReceipts.map((importReceipt) =>
                importReceipt.Id === action.payload.Id ? action.payload : importReceipt
            );
        },
        removeImportReceipt: (state, action) => {
            state.importReceipts = state.importReceipts.filter((importReceipt) => importReceipt.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = importReceiptSlice;

export const { setImportReceipts, addImportReceipt, editImportReceipt, removeImportReceipt, setIsLoading } = actions;

function fetchImportReceipts(importReceipts) {
    return async (dispatch) => {
        try {
            if (importReceipts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/importReceipt",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setImportReceipts(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (importReceipts.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createImportReceipt(importReceipt) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/importReceipt",
                method: "post",
                data: importReceipt,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addImportReceipt(resp.DataResult));
                }
                toast.success("Create importReceipt succeed!");
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

function updateImportReceipt(importReceipt) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/importReceipt/${importReceipt.Id}`,
                method: "put",
                data: importReceipt,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editImportReceipt(resp.DataResult));
                }
                toast.success("Update importReceipt succeed!");
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

function deleteImportReceipt(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/importReceipt/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeImportReceipt(resp.DataResult));
                }
                toast.success("Delete importReceipt succeed!");
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

export { fetchImportReceipts, createImportReceipt, updateImportReceipt, deleteImportReceipt };

export default reducer;
