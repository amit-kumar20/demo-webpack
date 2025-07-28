import React from 'react';
import { Notification } from '../types';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg ${
            notification.status === 'unread' ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          <p className="text-gray-800">{notification.message}</p>
          <span className={`text-sm ${
            notification.status === 'unread' ? 'text-blue-600' : 'text-gray-600'
          }`}>
            {notification.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
