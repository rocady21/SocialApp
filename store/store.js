import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import ChatSlice from './slices/ChatSlice';
import PostSlice from './slices/PostSlice';
import QuestionsSlice from './slices/QuestionsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: ChatSlice.reducer,
    post: PostSlice.reducer,
    questions: QuestionsSlice.reducer
  }
});
