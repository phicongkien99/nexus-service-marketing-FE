import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    fees: [],
    isLoading: false,
};

const feeSlice = createSlice({
    name: "fees",
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
            state.fees = state.fees.filter(
                (fee) => fee.id !== action.payload.id
            );
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
            //TODO: Call api
            const resp = {
                data: [],
            };
            dispatch(setFees(resp.data));
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Get fees failed!");
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
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(addFee(resp.data));
            toast.success("Create fee succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Create fee failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function updateFee(fee) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(editFee(resp.data));
            toast.success("Update fee succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Update fee failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteFee(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(removeFee(resp.data));
            toast.success("Delete fee succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Delete fee failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchFees, createFee, updateFee, deleteFee };

export default reducer;
