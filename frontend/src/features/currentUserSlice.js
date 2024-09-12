import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  loginStatus: false,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    unsetCurrentUser: (state, action) => {
      state.currentUser = {};
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { setCurrentUser, unsetCurrentUser, setLoginStatus } =
  currentUserSlice.actions;
export default currentUserSlice.reducer;
