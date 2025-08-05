import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  email: string;
  full_name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isVerified: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isVerified: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      console.log('setUser action payload:', action.payload);
      state.user = action.payload;
      state.isVerified = action.payload !== null;
      state.error = null;
      console.log('Updated auth state:', state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isVerified = false;
      state.error = null;
    }
  }
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsVerified = (state: { auth: AuthState }) => state.auth.isVerified;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
