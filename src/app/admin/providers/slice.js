import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    providers: [],
    isLoading: false, isSucceed: false,
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
                provider.Id === action.payload.Id ? action.payload : provider
            );
        },
        removeProvider: (state, action) => {
            state.providers = state.providers.filter((provider) => provider.Id !== action.payload.Id);
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
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
            if (resp.IsSuccess) {
                dispatch(setProviders(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
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
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/provider",
                method: "post",
                data: provider,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addProvider(resp.DataResult));
                }
                toast.success("Create provider succeed!");
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

function updateProvider(provider) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/provider/${provider.Id}`,
                method: "put",
                data: provider,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editProvider(resp.DataResult));
                }
                toast.success("Update provider succeed!");
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

function deleteProvider(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/provider/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeProvider(resp.DataResult));
                }
                toast.success("Delete provider succeed!");
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

export { fetchProviders, createProvider, updateProvider, deleteProvider };

export default reducer;
