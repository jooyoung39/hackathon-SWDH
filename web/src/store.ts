import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { careusApi } from './services/careusAPI';
import UserReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    [careusApi.reducerPath]: careusApi.reducer,
    user: UserReducer,
  },
  middleware: () => getDefaultMiddleware().concat(careusApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
