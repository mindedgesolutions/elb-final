import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listPosts: [],
  listReviews: [],
  editId: "",
  postDetailsModal: false,
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
    setEditPost: (state, action) => {
      state.editId = action.payload;
    },
    unsetEditPost: (state) => {
      state.editId = "";
    },
    showPostDetailsModal: (state) => {
      state.postDetailsModal = true;
    },
    hidePostDetailsModal: (state) => {
      state.postDetailsModal = false;
    },
  },
});

export const {
  setListPost,
  setListReviews,
  setEditPost,
  unsetEditPost,
  showPostDetailsModal,
  hidePostDetailsModal,
} = postSlice.actions;
export default postSlice.reducer;
