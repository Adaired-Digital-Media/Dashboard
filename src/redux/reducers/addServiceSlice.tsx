import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type AddServiceState = {
  navId: string;
  formValue: any;
};

const initialState: AddServiceState = {
  navId: "1",
  formValue: {},
};

const addServiceSlice = createSlice({
  name: "addService", 
  initialState,
  reducers: {
    setNavId: (state, action: PayloadAction<string>) => {
      state.navId = action.payload; 
    },
  },
});

export const { setNavId } = addServiceSlice.actions;

export default addServiceSlice.reducer;
