import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    providers: [],
    isLoading: false,
};

const providerSlice = createSlice({
    name: "providers",
    initialState: defaultState,
    reducers: {
        setProviders: (state, action) => {
            state.providers = action.payload;
        },
        addProvider: (state, action) => {
            state.providers.push(action.payload);
        },
        editProvider: (state, action) => {
            state.providers = state.providers.map((provider) =>
                provider.id === action.payload.id ? action.payload : provider
            );
        },
        removeProvider: (state, action) => {
            state.providers = state.providers.filter(
                (provider) => provider.id !== action.payload.id
            );
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = providerSlice;

export const { setProviders, addProvider, editProvider, removeProvider, setIsLoading } = actions;

function fetchProviders(providers) {
    return async (dispatch) => {
        try {
            if (providers.length === 0) {
                dispatch(setIsLoading(true));
            }
            //TODO: Call api
            const resp = {
                data: [],
            };
            dispatch(setProviders(resp.data));
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Get providers failed!");
        } finally {
            if (providers.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createProvider(provider) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(addProvider(resp.data));
            toast.success("Create provider succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Create provider failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function updateProvider(provider) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(editProvider(resp.data));
            toast.success("Update provider succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Update provider failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteProvider(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(removeProvider(resp.data));
            toast.success("Delete provider succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Delete provider failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchProviders, createProvider, updateProvider, deleteProvider };

export default reducer;
