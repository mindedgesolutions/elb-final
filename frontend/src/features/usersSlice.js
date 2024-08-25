import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {},
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
