// src/Redux/Slices/floatingWidgetSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BodyDataItem } from '@/types/ServicePageType';

interface FloatingWidgetState {
  selectedComponents: BodyDataItem[];
  bodyData: BodyDataItem[];
}

const initialState: FloatingWidgetState = {
  selectedComponents: [],
  bodyData: [],
};

const floatingWidgetSlice = createSlice({
  name: 'floatingWidget',
  initialState,
  reducers: {
    setSelectedComponents(state, action: PayloadAction<BodyDataItem[]>) {
      state.selectedComponents = action.payload;
    },
    setBodyData(state, action: PayloadAction<BodyDataItem[]>) {
      state.bodyData = action.payload;
    },
  },
});

export const { setSelectedComponents, setBodyData } = floatingWidgetSlice.actions;
export default floatingWidgetSlice.reducer;
