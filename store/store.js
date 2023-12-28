import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import ChatSlice from './slices/ChatSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: ChatSlice.reducer
  }
});
