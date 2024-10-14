import api from "@/config/axiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ImageType } from "@/types/imageManagerType";

interface ImageState {
  images: ImageType[];
  isLoading: boolean;
  deleteLoading: boolean;
  uploadLoading: boolean;
  success: boolean;
  error: string | null;
  gridView: boolean;
}

const initialState: ImageState = {
  images: [],
  isLoading: false,
  deleteLoading: false,
  uploadLoading: false,
  success: false,
  error: null,
  gridView: true,
};

export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/multer/getUploadedMedia`
  );
  return response.data.data;
});

export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (public_id: string) => {
    await api.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/multer/deleteFile/${public_id}`
    );
    return public_id;
  }
);

export const uploadImages = createAsyncThunk(
  "images/uploadImages",
  async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/multer/upload`,
      formData
    );
    return response.data;
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.uploadLoading = false;
      state.success = false;
      state.error = null;
    },
    setGridView: (state, action) => {
      state.gridView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Images
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

      // Delete Image
      .addCase(deleteImage.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.images = state.images.filter(
          (image) => image.public_id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || "Failed to delete image";
      })

      // Upload Images
      .addCase(uploadImages.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state) => {
        state.uploadLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.error.message || "Failed to upload images";
        state.success = false;
      });
  },
});

export const { resetUploadState, setGridView } = imageSlice.actions;

export default imageSlice.reducer;
