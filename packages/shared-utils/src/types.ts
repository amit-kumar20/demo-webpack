export type NotificationStatus = 'read' | 'unread';

export interface Notification {
  id: number;
  message: string;
  status: NotificationStatus;
}

export interface NotificationResponse {
  data: Notification[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPerPage: number;
  unreadCount: number;
  readCount: number;
}

export interface NotificationFilters {
  page: number;
  limit: number;
  searchTerm: string;
  filter: NotificationStatus | 'all';
}
