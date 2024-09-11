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
      state.sellerProfile = action.payload.profile;
      state.sellerRating = action.payload.rating;
    },
  },
});

export const { setListUsers, setUsers, setSellerProfile } = usersSlice.actions;
export default usersSlice.reducer;
