import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/usersSlice";
import categoryReducer from "@/features/categorySlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoryReducer,
  },
});
