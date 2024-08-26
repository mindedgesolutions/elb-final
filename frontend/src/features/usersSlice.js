import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUsers: [],
  user: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setListUsers: (state, action) => {
      state.listUsers = action.payload;
    },
    setUsers: (state, action) => {},
  },
});

export const { setListUsers, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
