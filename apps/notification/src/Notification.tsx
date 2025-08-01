import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from '@shared-utils/store';
import { fetchNotificationsAsync, setFilter, setPage, setSearchTerm } from '@shared-utils/store/notificationSlice';
import './index.css';

import FilterButtons, { FilterType } from "./components/FilterButtons";
import NotificationList from "./components/NotificationList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

const NotificationContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading, error, filters, totalPages, unreadCount, readCount } = useSelector(
    (state: RootState) => state.notification
  );

  // Fetch notifications on mount and when filters change
  useEffect(() => {
    dispatch(fetchNotificationsAsync());
  }, [dispatch, filters]);

  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilter(filter));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  if (loading) return <div className="text-center py-4">Loading notifications...</div>;
  if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-end mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <FilterButtons
        currentFilter={filters.filter}
        onFilter={handleFilterChange}
        unreadCount={unreadCount}
        readCount={readCount}
      />
      <NotificationList notifications={notifications} />
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Notification: React.FC = () => {
  return (
    <Provider store={store}>
      <NotificationContent />
    </Provider>
  );
};

export default Notification;
