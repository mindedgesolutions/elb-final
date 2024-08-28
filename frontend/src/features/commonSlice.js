import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateCounter: (state) => {
      state.counter += 1;
    },
  },
});

export const { updateCounter } = commonSlice.actions;
export default commonSlice.reducer;
