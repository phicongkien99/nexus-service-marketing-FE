import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    customers: [],
    isLoading: false,
};

const customerSlice = createSlice({
    name: "adminCustomers",
    initialState: defaultState,
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        addCustomer: (state, action) => {
            state.customers.push(action.payload);
        },
        editCustomer: (state, action) => {
            state.customers = state.customers.map((customer) =>
                customer.Id === action.payload.Id ? action.payload : customer
            );
        },
        removeCustomer: (state, action) => {
            state.customers = state.customers.filter((customer) => customer.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = customerSlice;

export const { setCustomers, addCustomer, editCustomer, removeCustomer, setIsLoading } = actions;

function fetchCustomers(customers) {
    return async (dispatch) => {
        try {
            if (customers.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/customer",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setCustomers(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (customers.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createCustomer(customer) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/customer",
                method: "post",
                data: customer,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addCustomer(resp.DataResult));
                }
                toast.success("Create customer succeed!");
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

function updateCustomer(customer) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/customer/${customer.Id}`,
                method: "put",
                data: customer,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editCustomer(resp.DataResult));
                }
                toast.success("Update customer succeed!");
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

function deleteCustomer(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/customer/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeCustomer(resp.DataResult));
                }
                toast.success("Delete customer succeed!");
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

export { fetchCustomers, createCustomer, updateCustomer, deleteCustomer };

export default reducer;
