import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parentCategories: [],
  listCategories: [],
  allCategories: [],
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
    setAllCategories: (state, action) => {
      state.allCategories = action.payload;
    },
  },
});

export const { setParentCategories, setListCategories, setAllCategories } =
  categorySlice.actions;
export default categorySlice.reducer;
