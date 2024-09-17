import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allLocations: [],
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setAllLocations: (state, action) => {
      state.allLocations = action.payload;
    },
  },
});

export const { setAllLocations } = locationSlice.actions;
export default locationSlice.reducer;
