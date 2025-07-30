import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import NotificationList from './components/NotificationList';
import Pagination from './components/Pagination';
import { NotificationStatus, NotificationResponse } from './types';
import { fetchNotifications } from './api/notificationApi';

const ITEMS_PER_PAGE = 10;

const Notification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState<NotificationStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<NotificationResponse>(
    ['notifications', searchTerm, currentFilter, currentPage],
    () => fetchNotifications(currentPage, ITEMS_PER_PAGE, searchTerm, currentFilter),
    {
      keepPreviousData: true,
    }
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    refetch();
  };

  const handleFilter = (filter: NotificationStatus | 'all') => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h2>
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mb-6">
          <FilterButtons onFilter={handleFilter} currentFilter={currentFilter} />
        </div>
        {isLoading ? (
          <div className="text-center py-10">
            <div className="spinner"></div>
            <p className="mt-2 text-gray-600">Loading notifications...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-600">
            Error fetching notifications. Please try again.
          </div>
        ) : (
          <>
            <NotificationList notifications={data?.data || []} />
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
