import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/usersSlice";
import categoryReducer from "@/features/categorySlice";
import wbSearchReducer from "@/features/wbSearchSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoryReducer,
    wbSearch: wbSearchReducer,
  },
});
