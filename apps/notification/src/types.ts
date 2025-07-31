// ✅ File: src/types.ts (or wherever it's located)

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
