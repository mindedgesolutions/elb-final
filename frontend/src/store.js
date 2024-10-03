import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/usersSlice";
import categoryReducer from "@/features/categorySlice";
import wbSearchReducer from "@/features/wbSearchSlice";
import currentUserReducer from "@/features/currentUserSlice";
import commonReducer from "@/features/commonSlice";
import formFieldReducer from "@/features/formFieldSlice";
import postReducer from "@/features/postSlice";
import locationReducer from "@/features/locationSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoryReducer,
    wbSearch: wbSearchReducer,
    currentUser: currentUserReducer,
    common: commonReducer,
    formFields: formFieldReducer,
    posts: postReducer,
    locations: locationReducer,
  },
});
