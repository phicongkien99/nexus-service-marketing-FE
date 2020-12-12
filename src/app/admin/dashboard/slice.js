import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    isLoading: false,
    dashboardData: {
        customers: [],
        contracts: [],
        employees: [],
        stores: [],
    },
};

const dashboardSlice = createSlice({
    name: "adminDashboard",
    initialState: defaultState,
    reducers: {
        setDashboardData: (state, action) => {
            state.dashboardData = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = dashboardSlice;

export const { setIsLoading, setDashboardData } = actions;

function fetchData() {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp1 = axiosClient({
                url: "/customer",
                method: "get",
            });
            const resp2 = axiosClient({
                url: "/contract",
                method: "get",
            });
            const resp3 = axiosClient({
                url: "/employee",
                method: "get",
            });
            const resp4 = axiosClient({
                url: "/store",
                method: "get",
            });
            const requests = [resp1, resp2, resp3, resp4];
            const results = await Promise.all(requests);
            const dashboardData = {
                customers: [],
                contracts: [],
                employees: [],
                stores: [],
            };
            if (results[0]["IsSuccess"]) {
                dashboardData["customers"] = results[0]["ListDataResult"];
            }
            if (results[1]["IsSuccess"]) {
                dashboardData["contracts"] = results[1]["ListDataResult"];
            }
            if (results[2]["IsSuccess"]) {
                dashboardData["employees"] = results[2]["ListDataResult"];
            }
            if (results[3]["IsSuccess"]) {
                dashboardData["stores"] = results[3]["ListDataResult"];
            }
            dispatch(setDashboardData(dashboardData));
            // if (resp.IsSuccess) {
            //     dispatch(setCustomers(resp.ListDataResult));
            //     dispatch(setIsSucceed(false));
            // } else {
            //     throw resp.ErrorMsg;
            // }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

export { fetchData };

export default reducer;
