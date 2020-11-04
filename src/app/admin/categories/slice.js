import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";

const { createSlice } = require("@reduxjs/toolkit");

const defaultState = {
    categories: [],
    isLoading: false,
};

const categorySlice = createSlice({
    name: "adminCategories",
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
            state.categories = state.categories.filter((category) => category.id !== action.payload);
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
            const resp = await axiosClient({
                url: "/category",
                method: "get",
            });
            if (resp.data.IsSuccess) {
                dispatch(setCategories(resp.data.ListDataResult));
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
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
            const resp = await axiosClient({
                url: "/category",
                method: "post",
                data: category,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(addCategory(resp.data.ListDataResult[0]));
                }
                toast.success("Create category succeed!");
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

function updateCategory(category) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/category/${category.id}`,
                method: "put",
                data: category,
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(editCategory(resp.data.ListDataResult[0]));
                }
                toast.success("Update category succeed!");
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

function deleteCategory(id) {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const resp = await axiosClient({
                url: `/category/${id}`,
                method: "delete",
            });
            if (resp.data.IsSuccess) {
                if (resp.data.ListDataResult.length > 0) {
                    dispatch(removeCategory(resp.data.ListDataResult[0]));
                }
                toast.success("Delete category succeed!");
            } else {
                throw resp.data.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error(e);
        } finally {
            setIsLoading(false);
        }
    };
}

export { fetchCategories, createCategory, updateCategory, deleteCategory };

export default reducer;
