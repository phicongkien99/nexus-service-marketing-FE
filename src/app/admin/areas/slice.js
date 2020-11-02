import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    areas: [],
    isLoading: false,
};

const areaSlice = createSlice({
    name: "areas",
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
                area.id === action.payload.id ? action.payload : area
            );
        },
        removeArea: (state, action) => {
            state.areas = state.areas.filter(
                (area) => area.id !== action.payload.id
            );
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = areaSlice;

export const { setAreas, addArea, editArea, removeArea, setIsLoading } = actions;

function fetchAreas(areas) {
    return async (dispatch) => {
        try {
            if (areas.length === 0) {
                dispatch(setIsLoading(true));
            }
            //TODO: Call api
            const resp = {
                data: [],
            };
            dispatch(setAreas(resp.data));
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Get areas failed!");
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
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(addArea(resp.data));
            toast.success("Create area succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Create area failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function updateArea(area) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(editArea(resp.data));
            toast.success("Update area succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Update area failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteArea(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(removeArea(resp.data));
            toast.success("Delete area succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Delete area failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchAreas, createArea, updateArea, deleteArea };

export default reducer;
