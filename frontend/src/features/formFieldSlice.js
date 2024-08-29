import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: [],
};

const formFieldSlice = createSlice({
  name: "formFields",
  initialState,
  reducers: {
    addFieldOption: (state, action) => {
      state.options.push(action.payload);
    },
    removeFieldOption: (state, action) => {
      const newArr = state.options.filter((opt) => opt !== action.payload);
      state.options = newArr;
    },
    editFieldOption: (state, action) => {
      const updatedArray = [...state.options];
      updatedArray[action.payload.index] = action.payload.value;
      state.options = updatedArray;
    },
  },
});

export const { addFieldOption, removeFieldOption, editFieldOption } =
  formFieldSlice.actions;
export default formFieldSlice.reducer;
