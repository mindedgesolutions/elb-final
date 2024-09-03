import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setListPost: (state, action) => {
      state.listPosts = action.payload;
    },
  },
});

export const { setListPost } = postSlice.actions;
export default postSlice.reducer;
