import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    serviceForms: [],
    isLoading: false,
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
            state.serviceForms = state.serviceForms.filter((serviceForm) => serviceForm.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = serviceFormSlice;

export const { setServiceForms, addServiceForm, editServiceForm, removeServiceForm, setIsLoading } = actions;

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
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/serviceform",
                method: "post",
                data: serviceForm,
            });
            if (resp.IsSuccess) {
                console.log(resp)
                if (resp.DataResult) {
                    dispatch(addServiceForm(resp.DataResult));
                }
                toast.success("Create serviceForm succeed!");
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

function updateServiceForm(serviceForm) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/serviceform/${serviceForm.Id}`,
                method: "put",
                data: serviceForm,
            });
            if (resp.IsSuccess) {
                console.log(resp);
                if (resp.DataResult) {
                    dispatch(editServiceForm(resp.DataResult));
                }
                toast.success("Update serviceForm succeed!");
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

function deleteServiceForm(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/serviceform/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                console.log(resp);
                if (resp.DataResult) {
                    dispatch(removeServiceForm(resp.DataResult));
                }
                toast.success("Delete serviceForm succeed!");
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

export { fetchServiceForms, createServiceForm, updateServiceForm, deleteServiceForm };

export default reducer;
