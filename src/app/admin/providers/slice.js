import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    providers: [],
    isLoading: false,
};

const providerSlice = createSlice({
    name: "adminProviders",
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
            state.providers = state.providers.filter((provider) => provider.id !== action.payload);
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
            const resp = await axiosClient({
                url: "/provider",
                method: "get",
            });
            if (resp.data.IsSuccess) {
                dispatch(setProviders(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
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
            const resp = await axiosClient({
                url: "/provider",
                method: "post",
                data: provider,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(addProvider(resp.data.ListDataResult[0]));
                }
                toast.success("Create provider succeed!");
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

function updateProvider(provider) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/provider/${provider.id}`,
                method: "put",
                data: provider,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(editProvider(resp.data.ListDataResult[0]));
                }
                toast.success("Update provider succeed!");
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

function deleteProvider(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/provider/${id}`,
                method: "delete",
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(removeProvider(resp.data.ListDataResult[0]));
                }
                toast.success("Delete provider succeed!");
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

export { fetchProviders, createProvider, updateProvider, deleteProvider };

export default reducer;
