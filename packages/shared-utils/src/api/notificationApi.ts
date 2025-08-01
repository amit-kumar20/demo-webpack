import { Notification, NotificationResponse, NotificationStatus, NotificationFilters } from '../types';

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
  { id: 13, message: 'Ticket REQ006 has been reopened', status: 'unread' },
  { id: 14, message: 'New comment on ticket REQ005', status: 'read' },
  { id: 15, message: 'Ticket REQ004 status changed to Blocked', status: 'unread' },
  { id: 16, message: 'Your ticket REQ003 has been merged', status: 'read' },
  { id: 17, message: 'Reminder: Review ticket REQ002', status: 'unread' },
  { id: 18, message: 'Ticket REQ001 has been archived', status: 'read' },
  { id: 19, message: 'New high priority ticket REQ000', status: 'unread' },
  { id: 20, message: 'System maintenance completed', status: 'read' },
];

export const fetchNotifications = async ({
  page = 1,
  limit = 10,
  searchTerm = '',
  filter = 'all',
}: NotificationFilters): Promise<NotificationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  let filteredNotifications = [...mockNotifications];

  if (searchTerm) {
    filteredNotifications = filteredNotifications.filter(notification =>
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filter !== 'all') {
    filteredNotifications = filteredNotifications.filter(notification => notification.status === filter);
  }

  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

  return {
    data: paginatedNotifications,
    totalPages,
    currentPage: page,
    totalItems,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    itemsPerPage: limit,
    unreadCount: filteredNotifications.filter(n => n.status === 'unread').length,
    readCount: filteredNotifications.filter(n => n.status === 'read').length,
  };
};
