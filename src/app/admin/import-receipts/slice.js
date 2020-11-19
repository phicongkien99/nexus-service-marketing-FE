import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    importReceipts: [],
    isLoading: false,
    isSucceed: false,
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
            state.importReceipts = state.importReceipts.filter(
                (importReceipt) => importReceipt.Id !== action.payload.Id
            );
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = importReceiptSlice;

export const {
    setImportReceipts,
    addImportReceipt,
    editImportReceipt,
    removeImportReceipt,
    setIsLoading,
    setIsSucceed,
} = actions;

function fetchImportReceipts(importReceipts) {
    return async (dispatch) => {
        try {
            if (importReceipts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/importreceipt",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setImportReceipts(resp.ListDataResult));
                dispatch(setIsSucceed(false));
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
                url: "/importreceipt",
                method: "post",
                data: { ...importReceipt, ImportDate: new Date() },
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(setIsSucceed(true));
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
                url: `/importreceipt/${importReceipt.Id}`,
                method: "put",
                data: importReceipt,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(setIsSucceed(true));
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
                url: `/importreceipt/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeImportReceipt(resp.DataResult));
                    dispatch(setIsSucceed(true));
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
