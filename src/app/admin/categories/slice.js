import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    categories: [],
    isLoading: false,
};

const categorySlice = createSlice({
    name: "categories",
    initialState: defaultState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        editCategory: (state, action) => {
            state.categories = state.categories.map((category) =>
                category.id === action.payload.id ? action.payload : category
            );
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter(
                (category) => category.id !== action.payload.id
            );
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer } = categorySlice;

export const { setCategories, addCategory, editCategory, removeCategory, setIsLoading } = actions;

function fetchCategories(categories) {
    return async (dispatch) => {
        try {
            if (categories.length === 0) {
                dispatch(setIsLoading(true));
            }
            //TODO: Call api
            const resp = {
                data: [],
            };
            dispatch(setCategories(resp.data));
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Get categories failed!");
        } finally {
            if (categories.length === 0) {
                dispatch(setIsLoading(false));
            }
        }
    };
}

function createCategory(category) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(addCategory(resp.data));
            toast.success("Create category succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Create category failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function updateCategory(category) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(editCategory(resp.data));
            toast.success("Update category succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Update category failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteCategory(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            //TODO: Call api;
            const resp = {
                data: {},
            };
            dispatch(removeCategory(resp.data));
            toast.success("Delete category succeed!");
        } catch (e) {
            console.error(e);
            toast.error(e.response ? e.response.data.message : "Delete category failed!");
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchCategories, createCategory, updateCategory, deleteCategory };

export default reducer;
