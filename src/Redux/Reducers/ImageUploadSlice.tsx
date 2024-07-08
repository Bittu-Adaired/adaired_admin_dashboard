import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UploadState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UploadState = {
  isLoading: false,
  error: null,
  success: false,
};

export const uploadImages = createAsyncThunk(
  "images/uploadImages",
  async (files: File[], thunkAPI) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/multer/upload`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to upload images";
        state.success = false;
      });
  },
});

export const { resetUploadState } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
