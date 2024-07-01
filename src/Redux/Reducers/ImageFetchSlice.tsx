import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ImageState {
  images: string[];
  isLoading: boolean;
  deleteLoading: boolean; // Separate loading state for deletion
  error: string | null;
}

const initialState: ImageState = {
  images: [],
  isLoading: false,
  deleteLoading: false,
  error: null,
};

export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  const response = await axios.get(
    "http://localhost:5173/api/v2/multer/files",
    {
      withCredentials: true,
    }
  );
    return response.data.files as string[];
//   return response.data;
});

export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (fileName: string) => {
    await axios.delete(`http://localhost:5173/api/v2/multer/deleteFile`, {
      data: { fileName },
      withCredentials: true,
    });
    return fileName;
  }
);

const imageFetchSlice = createSlice({
  name: "imageFetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
        state.error = null;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch images";
      })
      .addCase(deleteImage.pending, (state) => {
        state.deleteLoading = true; // Set delete loading state
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.deleteLoading = false; // Reset delete loading state
        state.images = state.images.filter((image) => image !== action.payload);
        state.error = null;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleteLoading = false; // Reset delete loading state
        state.error = action.error.message || "Failed to delete image";
      });
  },
});

export default imageFetchSlice.reducer;

