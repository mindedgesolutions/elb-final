import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listPosts: [],
  listReviews: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setListPost: (state, action) => {
      state.listPosts = action.payload;
    },
    setListReviews: (state, action) => {
      state.listReviews = action.payload;
    },
  },
});

export const { setListPost, setListReviews } = postSlice.actions;
export default postSlice.reducer;
