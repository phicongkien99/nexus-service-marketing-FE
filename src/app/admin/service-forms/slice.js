import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    serviceForms: [],
    isLoading: false,
    isSucceed: false,
};

const serviceFormSlice = createSlice({
    name: "adminServiceForms",
    initialState: defaultState,
    reducers: {
        setServiceForms: (state, action) => {
            state.serviceForms = action.payload;
        },
        addServiceForm: (state, action) => {
            state.serviceForms.push(action.payload);
        },
        editServiceForm: (state, action) => {
            state.serviceForms = state.serviceForms.map((serviceForm) =>
                serviceForm.Id === action.payload.Id ? action.payload : serviceForm
            );
        },
        removeServiceForm: (state, action) => {
            state.serviceForms = state.serviceForms.filter((serviceForm) => serviceForm.Id !== action.payload.Id);
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = serviceFormSlice;

export const {
    setServiceForms,
    addServiceForm,
    editServiceForm,
    removeServiceForm,
    setIsLoading,
    setIsSucceed,
} = actions;

function fetchServiceForms(serviceForms) {
    return async (dispatch) => {
        try {
            if (serviceForms.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/serviceform",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setServiceForms(resp.ListDataResult));
                dispatch(setIsSucceed(false));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (serviceForms.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createServiceForm(serviceForm) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            if (!serviceForm["IdCustomer"]) {
                const createCustomerResp = await axiosClient({
                    url: "/customer",
                    method: "post",
                    data: {
                        Address: serviceForm["CAddress"],
                        Name: serviceForm["CName"],
                        Phone: serviceForm["CPhone"],
                        Email: ""
                    },
                });
                if (createCustomerResp.IsSuccess && createCustomerResp.DataResult) {
                    serviceForm["IdCustomer"] = createCustomerResp.DataResult.Id;
                }
            }
            const resp = await axiosClient({
                url: "/serviceform",
                method: "post",
                data: serviceForm,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addServiceForm(resp.DataResult));
                    dispatch(setIsSucceed(true));
                }
                toast.success("Create serviceForm succeed!");
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

function updateServiceForm(serviceForm) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/serviceform/${serviceForm.Id}`,
                method: "put",
                data: serviceForm,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editServiceForm(resp.DataResult));
                    dispatch(setIsSucceed(true));
                }
                toast.success("Update serviceForm succeed!");
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

function deleteServiceForm(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/serviceform/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                
                if (resp.DataResult) {
                    dispatch(removeServiceForm(resp.DataResult));
                    dispatch(setIsSucceed(true));
                }
                toast.success("Delete serviceForm succeed!");
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

export { fetchServiceForms, createServiceForm, updateServiceForm, deleteServiceForm };

export default reducer;
