import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    areas: [],
    isLoading: false, isSucceed: false,
};

const areaSlice = createSlice({
    name: "adminAreas",
    initialState: defaultState,
    reducers: {
        setAreas: (state, action) => {
            state.areas = action.payload;
        },
        addArea: (state, action) => {
            state.areas.push(action.payload);
        },
        editArea: (state, action) => {
            state.areas = state.areas.map((area) =>
                area.Id === action.payload.Id ? action.payload : area
            );
        },
        removeArea: (state, action) => {
            state.areas = state.areas.filter((area) => area.Id !== action.payload.Id);
        },
        setIsSucceed: (state, action) => {
            state.isSucceed = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = areaSlice;

export const { setAreas, addArea, editArea, removeArea, setIsLoading, setIsSucceed } = actions;

function fetchAreas(areas) {
    return async (dispatch) => {
        try {
            if (areas.length === 0) {
                dispatch(setIsLoading(true));
            }
            const resp = await axiosClient({
                url: "/area",
                method: "get",
            });
            if (resp.IsSuccess) {
                dispatch(setAreas(resp.ListDataResult));dispatch(setIsSucceed(false));
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            if (areas.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createArea(area) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: "/area",
                method: "post",
                data: area,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(addArea(resp.DataResult));dispatch(setIsSucceed(true));
                }
                toast.success("Create area succeed!");
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

function updateArea(area) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/area/${area.Id}`,
                method: "put",
                data: area,
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(editArea(resp.DataResult));dispatch(setIsSucceed(true));
                }
                toast.success("Update area succeed!");
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

function deleteArea(id) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const resp = await axiosClient({
                url: `/area/${id}`,
                method: "delete",
            });
            if (resp.IsSuccess) {
                if (resp.DataResult) {
                    dispatch(removeArea(resp.DataResult));dispatch(setIsSucceed(true));
                }
                toast.success("Delete area succeed!");
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

export { fetchAreas, createArea, updateArea, deleteArea };

export default reducer;
