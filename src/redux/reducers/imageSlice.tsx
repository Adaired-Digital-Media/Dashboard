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
  activeTabs: string;
  addModal: boolean;
}

const initialState: ImageState = {
  images: [],
  isLoading: false,
  deleteLoading: false,
  uploadLoading: false,
  success: false,
  error: null,
  gridView: true,
  activeTabs: "1",
  addModal: false,
};

export const fetchIcons = createAsyncThunk("images/fetchIcons", async () => {
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/multer/getSvgMedia`
  );
  return data.data;
});

export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/multer/getUploadedMedia`
  );
  return data.data;
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
    files.forEach((file) => formData.append("files", file));
    const { data } = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/multer/upload`,
      formData
    );
    return data;
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
    setAddModal: (state) => {
      state.addModal = !state.addModal;
    },
    updateActiveTabs: (state, action) => {
      state.activeTabs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch images";
      })

      .addCase(fetchIcons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIcons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = [...state.images, ...action.payload];
      })
      .addCase(fetchIcons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch icons";
      })

      .addCase(deleteImage.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.images = state.images.filter(
          (image) => image.public_id !== action.payload
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || "Failed to delete image";
      })

      .addCase(uploadImages.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.success = true;
        state.images = [...state.images, ...action.payload.data];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.error.message || "Failed to upload images";
        state.success = false;
      });
  },
});

export const { resetUploadState, setGridView, updateActiveTabs, setAddModal } =
  imageSlice.actions;
export default imageSlice.reducer;
