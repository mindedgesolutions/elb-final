import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parentCategories: [],
  listCategories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setParentCategories: (state, action) => {
      state.parentCategories = action.payload;
    },
    setListCategories: (state, action) => {
      state.listCategories = action.payload;
    },
  },
});

export const { setParentCategories, setListCategories } = categorySlice.actions;
export default categorySlice.reducer;
