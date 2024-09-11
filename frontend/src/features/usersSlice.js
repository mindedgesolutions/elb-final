import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUsers: [],
  user: {},
  sellerProfile: {},
  sellerRating: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setListUsers: (state, action) => {
      state.listUsers = action.payload;
    },
    setUsers: (state, action) => {},
    setSellerProfile: (state, action) => {
      state.sellerProfile = action.payload;
    },
    setSellerRating: (state, action) => {
      state.sellerRating = action.payload;
    },
  },
});

export const { setListUsers, setUsers, setSellerProfile, setSellerRating } =
  usersSlice.actions;
export default usersSlice.reducer;
