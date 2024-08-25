import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
