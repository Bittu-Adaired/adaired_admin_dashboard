import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ImageType {
  asset_id: string;
  public_id: string;
  folder: string;
  filename: string;
  secure_url: string;
  url: string;
}

interface ImageState {
  images: ImageType[];
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/multer/getUploadedMedia`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
});

export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (public_id: string) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/multer/deleteFile/${public_id}`,
      {
        withCredentials: true,
      }
    );
    return public_id;
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
        state.images = state.images.filter(
          (image) => image.filename !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleteLoading = false; // Reset delete loading state
        state.error = action.error.message || "Failed to delete image";
      });
  },
});

export default imageFetchSlice.reducer;
