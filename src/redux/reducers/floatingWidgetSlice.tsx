// src/Redux/Slices/floatingWidgetSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BodyDataItem } from "@/types/ServicePageType";

interface FloatingWidgetState {
  selectedComponents: BodyDataItem[];
  bodyData: BodyDataItem[];
}

const initialState: FloatingWidgetState = {
  selectedComponents: [],
  bodyData: [],
};

const floatingWidgetSlice = createSlice({
  name: "floatingWidget",
  initialState,
  reducers: {
    setSelectedComponents(state, action: PayloadAction<BodyDataItem[]>) {
      state.selectedComponents = action.payload;
    },
    setBodyData(state, action: PayloadAction<BodyDataItem[]>) {
      state.bodyData = action.payload;
    },
    updateBodyDataItem(
      state,
      action: PayloadAction<{ index: number; inputName: string; value: any }>
    ) {
      const { index, inputName, value } = action.payload;

      if (state.bodyData[index]) {
        // Initialize body if it doesn't exist
        if (!state.bodyData[index].body) {
          state.bodyData[index].body = {};
        }

        // Update the specific field in bodyData
        state.bodyData[index].body[inputName] = value;
      }
    },
  },
});

export const { setSelectedComponents, setBodyData, updateBodyDataItem } =
  floatingWidgetSlice.actions;
export default floatingWidgetSlice.reducer;
