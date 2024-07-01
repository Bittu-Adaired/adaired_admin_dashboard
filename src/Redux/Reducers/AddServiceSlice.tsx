import { createSlice } from "@reduxjs/toolkit";
import { AddServiceSliceType } from "@/Types/ServiceSliceTypes";

const initialState: AddServiceSliceType = {
  navId: 1,
  formValue: {},
};

const AddServiceSlice = createSlice({
  name: "addService",
  initialState,
  reducers: {
    setNavId: (state, action) => {
      state.navId = action.payload;
    },
  },
});

export const { setNavId } = AddServiceSlice.actions;

export default AddServiceSlice.reducer;
