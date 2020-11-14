import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    isLoading: false, isSucceed: false,
    isReceived: false,
};

const customerFeedbackSlice = createSlice({
    name: "userCustomerFeedbacks",
    initialState: defaultState,
    reducers: {
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsReceived: (state, action) => {
            state.isReceived = action.payload;
        },
    },
});

const { actions, reducer } = customerFeedbackSlice;

export const { setIsLoading, setIsReceived } = actions;

function createCustomerFeedback(customerFeedback) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const findCustomerResp = await axiosClient({
                url: "/customer",
                method: "get",
                params: {
                    phone: customerFeedback.Phone,
                }
            });
            let IdCustomer = null;
            console.log(findCustomerResp)
            if (findCustomerResp.IsSuccess && findCustomerResp.DataResult) {
                IdCustomer = findCustomerResp.DataResult.Id;
            }
            // const resp = await axiosClient({
            //     url: "/customerFeedback",
            //     method: "post",
            //     data: customerFeedback,
            // });
            // if (resp.IsSuccess && resp.DataResult) {
            //     toast.success("Your feedback has been received! Thanks for supporting us.");
            //     dispatch(setIsReceived(true));
            // } else {
            //     toast.error("Something has gone wrong! Please try again later.");
            //     throw resp.ErrorMsg;
            // }
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

export { createCustomerFeedback };

export default reducer;
