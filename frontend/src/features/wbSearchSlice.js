import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationModal: false,
  categoryModal: false,
  searchLocation: null,
  searchCategory: null,
};

const wbSearchSlice = createSlice({
  name: "wbSearch",
  initialState,
  reducers: {
    openLocationModal: (state) => {
      state.locationModal = true;
    },
    closeLocationModal: (state) => {
      state.locationModal = false;
    },
    openCategoryModal: (state) => {
      state.categoryModal = true;
    },
    closeCategoryModal: (state) => {
      state.categoryModal = false;
    },
    setSearchLocation: (state, action) => {
      state.searchLocation = action.payload;
    },
    unsetSearchLocation: (state) => {
      state.searchLocation = null;
    },
    setSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
    unsetSearchCategory: (state) => {
      state.searchCategory = null;
    },
  },
});

export const {
  openLocationModal,
  closeLocationModal,
  openCategoryModal,
  closeCategoryModal,
  setSearchLocation,
  unsetSearchLocation,
  setSearchCategory,
  unsetSearchCategory,
} = wbSearchSlice.actions;

export default wbSearchSlice.reducer;
