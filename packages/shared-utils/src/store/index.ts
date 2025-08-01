import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState as AuthStateType } from './authSlice';
import notificationReducer, { NotificationState } from './notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthState = AuthStateType;
export type { NotificationState };
