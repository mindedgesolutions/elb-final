import { createSlice } from "@reduxjs/toolkit";

// history: 1. seller-page 2. review-modal 3. wishlist

const initialState = {
  counter: 0,
  loginForm: false,
  history: "",
  href: "",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateCounter: (state) => {
      state.counter += 1;
    },
    setLoginForm: (state, action) => {
      state.loginForm = true;
      state.history = action.payload.history;
      state.href = action.payload.href;
    },
    unsetLoginForm: (state) => {
      state.loginForm = false;
      state.history = "";
      state.href = "";
    },
  },
});

export const { updateCounter, setLoginForm, unsetLoginForm } =
  commonSlice.actions;
export default commonSlice.reducer;
