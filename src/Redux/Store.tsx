import AddServiceSlice from './Reducers/AddServiceSlice';
import HeaderBookmarkSlice from './Reducers/HeaderBookmarkSlice';
import ImageFetchReducer from './Reducers/ImageFetchSlice';
import ImageUploadReducer from './Reducers/ImageUploadSlice';
import LayoutSlice from './Reducers/LayoutSlice';
import { configureStore } from '@reduxjs/toolkit';

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    addService: AddServiceSlice,
    imageUpload: ImageUploadReducer,
    imageFetch: ImageFetchReducer,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
