import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddPostState {
  navId: string;
  formValue: any;
}

const initialState: AddPostState = {
  navId: "1",
  formValue: {},
};

const addPostSlice = createSlice({
  name: "addPost",
  initialState,
  reducers: {
    setNavId: (state, action: PayloadAction<string>) => {
      state.navId = action.payload;
    },
  },
});

export const { setNavId } = addPostSlice.actions;

export default addPostSlice.reducer;
