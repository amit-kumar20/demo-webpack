import React from 'react';
import { Notification } from '../types';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No notifications found.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className={`p-4 rounded-lg shadow-sm transition-colors duration-200 ${
            notification.status === 'unread'
              ? 'bg-blue-50 hover:bg-blue-100'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-gray-800 ${notification.status === 'unread' ? 'font-semibold' : ''}`}>
              {notification.message}
            </p>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                notification.status === 'unread'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {notification.status}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {/* You can add more details here, like timestamp */}
            2 hours ago
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
