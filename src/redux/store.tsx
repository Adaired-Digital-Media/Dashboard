import AddServiceState from "./reducers/addServiceSlice";
import HeaderBookmarkSlice from "./reducers/headerBookmarkSlice";
import LayoutState from "./reducers/layoutSlice";
import AddPostState from "./reducers/addPostSlice";
import FloatingWidgetReducer from "./reducers/floatingWidgetSlice";
import imageReducer from "./reducers/imageSlice";
import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: {
    layout: LayoutState,
    headerBookMark: HeaderBookmarkSlice,
    image: imageReducer,
    floatingWidget: FloatingWidgetReducer,
    addPost: AddPostState,
    addService: AddServiceState,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
