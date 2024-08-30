import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: [],
  listFormFields: [],
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
    unsetFieldOptions: (state) => {
      state.options = [];
    },
    setListFormFields: (state, action) => {
      state.listFormFields = action.payload;
    },
  },
});

export const {
  addFieldOption,
  removeFieldOption,
  editFieldOption,
  unsetFieldOptions,
  setListFormFields,
} = formFieldSlice.actions;
export default formFieldSlice.reducer;
