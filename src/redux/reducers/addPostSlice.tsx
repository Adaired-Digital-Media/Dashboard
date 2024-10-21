import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface AddPostState {
  navId: string;
  formValue: any;
  filterToggle: boolean;
}

const initialState: AddPostState = {
  navId: "1",
  formValue: {},
  filterToggle: false,
};

const addPostSlice = createSlice({
  name: "addPost",
  initialState,
  reducers: {
    setNavId: (state, action: PayloadAction<string>) => {
      state.navId = action.payload;
    },
    setFilterToggle: (state) => {
      state.filterToggle = !state.filterToggle;
    },
  },
});

export const { setNavId, setFilterToggle } = addPostSlice.actions;

export default addPostSlice.reducer;
