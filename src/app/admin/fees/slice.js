import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    fees: [],
    isLoading: false,
};

const feeSlice = createSlice({
    name: "adminFees",
    initialState: defaultState,
    reducers: {
        setFees: (state, action) => {
            state.fees = action.payload;
        },
        addFee: (state, action) => {
            state.fees.push(action.payload);
        },
        editFee: (state, action) => {
            state.fees = state.fees.map((fee) =>
                fee.id === action.payload.id ? action.payload : fee
            );
        },
        removeFee: (state, action) => {
            state.fees = state.fees.filter((fee) => fee.id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = feeSlice;

export const { setFees, addFee, editFee, removeFee, setIsLoading } = actions;

function fetchFees(fees) {
    return async (dispatch) => {
        try {
            if (fees.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/fee",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setFees(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (fees.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createFee(fee) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/fee",
                method: "post",
                data: fee,
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(addFee(resp.ListDataResult[0]));
                }
                toast.success("Create fee succeed!");
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

function updateFee(fee) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/fee/${fee.id}`,
                method: "put",
                data: fee,
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(editFee(resp.ListDataResult[0]));
                }
                toast.success("Update fee succeed!");
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

function deleteFee(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/fee/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.ListDataResult.length > 0) {
                    dispatch(removeFee(resp.ListDataResult[0]));
                }
                toast.success("Delete fee succeed!");
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

export { fetchFees, createFee, updateFee, deleteFee };

export default reducer;
