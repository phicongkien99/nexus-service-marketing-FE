import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    employees: [],
    isLoading: false, isSucceed: false,
};

const employeeSlice = createSlice({
    name: "adminEmployees",
    initialState: defaultState,
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
        editEmployee: (state, action) => {
            state.employees = state.employees.map((employee) =>
                employee.Id === action.payload.Id ? action.payload : employee
            );
        },
        removeEmployee: (state, action) => {
            state.employees = state.employees.filter((employee) => employee.Id !== action.payload.Id);
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = employeeSlice;

export const { setEmployees, addEmployee, editEmployee, removeEmployee, setIsLoading } = actions;

function fetchEmployees(employees) {
    return async (dispatch) => {
        try {
            if (employees.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/employee",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setEmployees(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (employees.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createEmployee(employee) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/employee",
                method: "post",
                data: employee,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addEmployee(resp.DataResult));
                }
                toast.success("Create employee succeed!");
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

function updateEmployee(employee) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/employee/${employee.Id}`,
                method: "put",
                data: employee,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editEmployee(resp.DataResult));
                }
                toast.success("Update employee succeed!");
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

function deleteEmployee(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/employee/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeEmployee(resp.DataResult));
                }
                toast.success("Delete employee succeed!");
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

export { fetchEmployees, createEmployee, updateEmployee, deleteEmployee };

export default reducer;
