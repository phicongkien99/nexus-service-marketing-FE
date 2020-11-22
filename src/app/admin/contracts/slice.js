import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    contracts: [],
    isLoading: false,
    isSucceed: false,
    detailContract: {},
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
            state.contracts = state.contracts.filter(
                (contract) => contract.Id !== action.payload.Id
            );
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setDetailContract: (state, action) => {
            state.detailContract = action.payload;
        },
    },
});

const { actions, reducer } = contractSlice;

export const {
    setContracts,
    setDetailContract,
    addContract,
    editContract,
    removeContract,
    setIsLoading,
    setIsSucceed,
} = actions;

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
                dispatch(setIsSucceed(false));
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

function fetchContract(contractId) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/contract",
                method: "get",
                params: {
                    contractId,
                },
            });
            if (resp.IsSuccess && resp.DataResult) {
                const detailContract = { ...resp.DataResult };
                const areaResp = await axiosClient({
                    url: `/area/${detailContract["IdArea"]}`,
                    method: "get",
                });
                if (areaResp.IsSuccess && areaResp.DataResult) {
                    detailContract["AreaName"] = areaResp.DataResult.Name;
                }
                const connectionResp = await axiosClient({
                    url: `/connection`,
                    method: "get",
                    params: {
                        idContract: detailContract["Id"],
                    },
                });
                if (connectionResp.IsSuccess && connectionResp.DataResult) {
                    const connectionObj = { ...connectionResp.DataResult };
                    const connectionStatusResp = await axiosClient({
                        url: `/connectionstatus/${connectionObj["IdConnectionStatus"]}`,
                        method: "get",
                    });
                    if (connectionStatusResp.IsSuccess && connectionStatusResp.DataResult) {
                        connectionObj["status"] = connectionStatusResp.DataResult.Name;
                    }
                    const deviceResp = await axiosClient({
                        url: `/device/${connectionObj["IdDevice"]}`,
                        method: "get",
                    });
                    if (deviceResp.IsSuccess && deviceResp.DataResult) {
                        connectionObj["device"] = deviceResp.DataResult.Name;
                    }
                    const servicePackResp = await axiosClient({
                        url: `/servicepack/${connectionObj["IdServicePack"]}`,
                        method: "get",
                    });
                    if (servicePackResp.IsSuccess && servicePackResp.DataResult) {
                        connectionObj["servicePack"] = servicePackResp.DataResult.Name;
                    }
                    detailContract["Connection"] = connectionObj;
                }
                dispatch(setDetailContract(detailContract));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            toast.error(`Contract with ID ${contractId} doesn't exist!`);
            console.error(e);
            toast.error(e);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
}

function createContract(serviceForm) {
    return async (dispatch) => {
        try {
            const contract = {
                Address: serviceForm["Address"],
                ServiceFormId: serviceForm["ServiceFormId"],
                IdArea: serviceForm["IdArea"],
                IdCustomer: serviceForm["IdCustomer"],
            };
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/contract",
                method: "post",
                data: contract,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    const connection = {
                        IdConnectionStatus: 1,
                        IdContract: resp.DataResult.Id,
                        IdDevice: 1,
                        IdServicePack: serviceForm["IdServicePack"],
                        StartDate: resp.DataResult.CreatedAt,
                    };
                    const connectionResp = await axiosClient({
                        url: "/connection",
                        method: "post",
                        data: connection,
                    });
                    if (connectionResp.IsSuccess && connectionResp.DataResult) {
                        dispatch(setIsSucceed(true));
                        toast.success("Create contract succeed!");
                    }
                }
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

function updateContract(contract) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/contract/${contract.Id}`,
                method: "put",
                data: contract,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editContract(resp.DataResult));
                    dispatch(setIsSucceed(true));
                }
                toast.success("Update contract succeed!");
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

function createPayment(payment) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/payment`,
                method: "post",
                data: payment,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(setIsSucceed(true));
                }
                toast.success("Create payment succeed!");
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

function updatePayment(payment) {
    return async (dispatch) => {
        try {
            const newPayment = {
                ...payment,
                PayDate: new Date(),
            }
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/payment/${payment["Id"]}`,
                method: "put",
                data: newPayment,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(setIsSucceed(true));
                }
                toast.success("Update payment succeed!");
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

export { fetchContracts, fetchContract, createContract, updateContract, createPayment, updatePayment };

export default reducer;
