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
                store.Id === action.payload.Id ? action.payload : store
            );
        },
        removeStore: (state, action) => {
            state.stores = state.stores.filter((store) => store.Id !== action.payload);
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
            if (resp.IsSuccess) {
                dispatch(setStores(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
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
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(addStore(resp.ListDataResult[0]));
                }
                toast.success("Create store succeed!");
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

function updateStore(store) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/store/${store.Id}`,
                method: "put",
                data: store,
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(editStore(resp.ListDataResult[0]));
                }
                toast.success("Update store succeed!");
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

function deleteStore(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/store/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(removeStore(resp.ListDataResult[0]));
                }
                toast.success("Delete store succeed!");
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

export { fetchStores, createStore, updateStore, deleteStore };

export default reducer;
