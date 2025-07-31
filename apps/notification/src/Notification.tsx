// ✅ File: src/Notification.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import './index.css';

import FilterButtons, { FilterType } from "./components/FilterButtons";
import NotificationList from "./components/NotificationList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import { fetchNotifications } from "./api/notificationApi";
import { NotificationResponse } from "./types";

const Notification: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, error } = useQuery<NotificationResponse>({
    queryKey: ["notifications", currentPage, currentFilter, searchTerm],
    queryFn: () =>
      fetchNotifications({
        page: currentPage,
        limit: 10,
        searchTerm: searchTerm,
        filter: currentFilter,
      }),
    keepPreviousData: true,
  });

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  if (isLoading) return <div className="text-center py-4">Loading notifications...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error fetching notifications.</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-end mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <FilterButtons
        currentFilter={currentFilter}
        onFilter={handleFilterChange}
        unreadCount={data?.unreadCount ?? 0}
        readCount={data?.readCount ?? 0}
      />
      <NotificationList notifications={data?.data ?? []} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Notification;
