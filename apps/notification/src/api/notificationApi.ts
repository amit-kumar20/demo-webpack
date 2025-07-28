import { Notification, NotificationResponse, NotificationStatus } from '../types';

// Mock data for notifications
const mockNotifications: Notification[] = [
  { id: 1, message: 'Your ticket REQ018 has been updated to Completed', status: 'unread' },
  { id: 2, message: 'New comment on ticket REQ017', status: 'read' },
  { id: 3, message: 'Ticket REQ016 has been assigned to you', status: 'unread' },
  { id: 4, message: 'Your ticket REQ015 status changed to In Progress', status: 'read' },
  { id: 5, message: 'Reminder: Pending action on ticket REQ014', status: 'unread' },
  { id: 6, message: 'Ticket REQ013 has been resolved', status: 'read' },
  { id: 7, message: 'New priority ticket REQ012 assigned', status: 'unread' },
  { id: 8, message: 'Ticket REQ011 needs your review', status: 'read' },
  { id: 9, message: 'Comment added to ticket REQ010', status: 'unread' },
  { id: 10, message: 'Ticket REQ009 has been closed', status: 'read' },
  { id: 11, message: 'New ticket REQ008 created', status: 'unread' },
  { id: 12, message: 'Ticket REQ007 deadline updated', status: 'read' },
];

export const fetchNotifications = async (
  page = 1,
  limit = 10,
  searchTerm = '',
  filter: NotificationStatus | 'all' = 'all'
): Promise<NotificationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  let filteredNotifications = [...mockNotifications];

  // Apply search filter
  if (searchTerm) {
    filteredNotifications = filteredNotifications.filter(notification =>
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply status filter
  if (filter !== 'all') {
    filteredNotifications = filteredNotifications.filter(
      notification => notification.status === filter
    );
  }

  // Calculate pagination
  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

  return {
    data: paginatedNotifications,
    totalPages,
    currentPage: page,
  };
};
