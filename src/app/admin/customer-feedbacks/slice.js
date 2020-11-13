import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    customerFeedbacks: [],
    isLoading: false, isSucceed: false,
};

const customerFeedbackSlice = createSlice({
    name: "adminCustomerFeedbacks",
    initialState: defaultState,
    reducers: {
        setCustomerFeedbacks: (state, action) => {
            state.customerFeedbacks = action.payload;
        },
        addCustomerFeedback: (state, action) => {
            state.customerFeedbacks.push(action.payload);
        },
        editCustomerFeedback: (state, action) => {
            state.customerFeedbacks = state.customerFeedbacks.map((customerFeedback) =>
                customerFeedback.Id === action.payload.Id ? action.payload : customerFeedback
            );
        },
        removeCustomerFeedback: (state, action) => {
            state.customerFeedbacks = state.customerFeedbacks.filter((customerFeedback) => customerFeedback.Id !== action.payload.Id);
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = customerFeedbackSlice;

export const { setCustomerFeedbacks, addCustomerFeedback, editCustomerFeedback, removeCustomerFeedback, setIsLoading } = actions;

function fetchCustomerFeedbacks(customerFeedbacks) {
    return async (dispatch) => {
        try {
            if (customerFeedbacks.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/customerFeedback",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setCustomerFeedbacks(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (customerFeedbacks.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createCustomerFeedback(customerFeedback) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/customerFeedback",
                method: "post",
                data: customerFeedback,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addCustomerFeedback(resp.DataResult));
                }
                toast.success("Create customerFeedback succeed!");
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

function updateCustomerFeedback(customerFeedback) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/customerFeedback/${customerFeedback.Id}`,
                method: "put",
                data: customerFeedback,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editCustomerFeedback(resp.DataResult));
                }
                toast.success("Update customerFeedback succeed!");
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

function deleteCustomerFeedback(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/customerFeedback/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeCustomerFeedback(resp.DataResult));
                }
                toast.success("Delete customerFeedback succeed!");
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

export { fetchCustomerFeedbacks, createCustomerFeedback, updateCustomerFeedback, deleteCustomerFeedback };

export default reducer;
