import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationResponse, NotificationStatus, NotificationFilters } from '../types';
import { fetchNotifications } from '../api/notificationApi';

export interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  filters: NotificationFilters;
  totalPages: number;
  unreadCount: number;
  readCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  filters: {
    page: 1,
    limit: 10,
    searchTerm: '',
    filter: 'all'
  },
  totalPages: 1,
  unreadCount: 0,
  readCount: 0
};

export const fetchNotificationsAsync = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, { getState }) => {
    const state = getState() as { notification: NotificationState };
    const response = await fetchNotifications(state.notification.filters);
    return response;
  }
);

export const markAsReadAsync = createAsyncThunk(
  'notification/markAsRead',
  async (id: number) => {
    // For now, just return the id since it's a dummy API
    // When real API is ready, we'll make the API call here
    return id;
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<NotificationStatus | 'all'>) {
      state.filters.filter = action.payload;
      state.filters.page = 1; // Reset to first page when filter changes
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.filters.searchTerm = action.payload;
      state.filters.page = 1; // Reset to first page when search changes
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action: PayloadAction<NotificationResponse>) => {
        state.loading = false;
        state.notifications = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.unreadCount = action.payload.unreadCount;
        state.readCount = action.payload.readCount;
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      })
      .addCase(markAsReadAsync.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification) {
          notification.status = 'read';
          state.unreadCount--;
          state.readCount++;
        }
      });
  }
});

export const { setFilter, setSearchTerm, setPage } = notificationSlice.actions;
export default notificationSlice.reducer;
