import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    contracts: [],
    isLoading: false,
};

const contractSlice = createSlice({
    name: "adminContracts",
    initialState: defaultState,
    reducers: {
        setContracts: (state, action) => {
            state.contracts = action.payload;
        },
        addContract: (state, action) => {
            state.contracts.push(action.payload);
        },
        editContract: (state, action) => {
            state.contracts = state.contracts.map((contract) =>
                contract.Id === action.payload.Id ? action.payload : contract
            );
        },
        removeContract: (state, action) => {
            state.contracts = state.contracts.filter((contract) => contract.Id !== action.payload);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = contractSlice;

export const { setContracts, addContract, editContract, removeContract, setIsLoading } = actions;

function fetchContracts(contracts) {
    return async (dispatch) => {
        try {
            if (contracts.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/contract",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setContracts(resp.ListDataResult));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (contracts.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createContract(contract) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: "/contract",
                method: "post",
                data: contract,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addContract(resp.DataResult));
                }
                toast.success("Create contract succeed!");
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

function updateContract(contract) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/contract/${contract.Id}`,
                method: "put",
                data: contract,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editContract(resp.DataResult));
                }
                toast.success("Update contract succeed!");
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

function deleteContract(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/contract/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeContract(resp.DataResult));
                }
                toast.success("Delete contract succeed!");
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

export { fetchContracts, createContract, updateContract, deleteContract };

export default reducer;
