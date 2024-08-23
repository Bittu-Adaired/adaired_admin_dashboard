import { createSlice } from "@reduxjs/toolkit";

type PostType = {
  navId: number;
  formValue: any;
};

const initialState: PostType = {
  navId: 1,
  formValue: {},
};

const AddPostSlice = createSlice({
  name: "addPost",
  initialState,
  reducers: {
    setNavId: (state, action) => {
      state.navId = action.payload;
    },
  },
});

export const { setNavId } = AddPostSlice.actions;

export default AddPostSlice.reducer;
