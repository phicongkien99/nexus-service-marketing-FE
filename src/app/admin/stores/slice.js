import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    stores: [],
    isLoading: false,
};

const storeSlice = createSlice({
    name: "adminStores",
    initialState: defaultState,
    reducers: {
        setStores: (state, action) => {
            state.stores = action.payload;
        },
        addStore: (state, action) => {
            state.stores.push(action.payload);
        },
        editStore: (state, action) => {
            state.stores = state.stores.map((store) =>
                store.id === action.payload.id ? action.payload : store
            );
        },
        removeStore: (state, action) => {
            state.stores = state.stores.filter((store) => store.id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = storeSlice;

export const { setStores, addStore, editStore, removeStore, setIsLoading } = actions;

function fetchStores(stores) {
    return async (dispatch) => {
        try {
            if (stores.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/store",
                method: "get",
            });
            if (resp.data.IsSuccess) {
                dispatch(setStores(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (stores.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createStore(store) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/store",
                method: "post",
                data: store,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(addStore(resp.data.ListDataResult[0]));
                }
                toast.success("Create store succeed!");
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

function updateStore(store) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/store/${store.id}`,
                method: "put",
                data: store,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(editStore(resp.data.ListDataResult[0]));
                }
                toast.success("Update store succeed!");
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

function deleteStore(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/store/${id}`,
                method: "delete",
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(removeStore(resp.data.ListDataResult[0]));
                }
                toast.success("Delete store succeed!");
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

export { fetchStores, createStore, updateStore, deleteStore };

export default reducer;
