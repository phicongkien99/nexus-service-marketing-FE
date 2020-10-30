import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    stores: [],
    isLoading: false,
};

const storeSlice = createSlice({
    name: "stores",
    initialState: defaultState,
    reducers: {
        setStores: (state, action) => {
            state.stores = action.payload;
        },
        addStore: (state, action) => {
            state.stores.push(action.payload);
        },
        editStore: (state, action) => {
            state.stores = state.stores.map((store) => (store.id === action.payload.id ? action.payload : store));
        },
        removeStore: (state, action) => {
            state.stores = state.stores.filter((store) => store.id !== action.payload.id);
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
            //TODO: Call api
            const resp = {
                data: [],
            };
            dispatch(setStores(resp.data));
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Get stores failed!");
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
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(addStore(resp.data));
            toast.success("Create store succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Create store failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function updateStore(store) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(editStore(resp.data));
            toast.success("Update store succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Update store failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteStore(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(removeStore(resp.data));
            toast.success("Delete store succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Delete store failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchStores, createStore, updateStore, deleteStore };

export default reducer;
