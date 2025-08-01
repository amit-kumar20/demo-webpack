import React from 'react';
import { useDispatch } from 'react-redux';
import { Notification } from '@shared-utils/types';
import { markAsReadAsync } from '@shared-utils/store/notificationSlice';
import { AppDispatch } from '@shared-utils/store';
import { FiBell } from 'react-icons/fi';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const dispatch = useDispatch<AppDispatch>();

  if (notifications.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm">
        No notifications found.
      </div>
    );
  }

  return (
    <ul className="space-y-4 sm:space-y-3">
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className={`p-3 sm:p-4 rounded-xl border transition-colors duration-200 shadow-sm ${
            notification.status === 'unread'
              ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-100 text-blue-600 rounded-full">
                <FiBell className="text-lg sm:text-xl" />
              </div>
              <div className="flex-grow">
                <p className={`text-xs sm:text-sm leading-snug text-gray-800 ${
                  notification.status === 'unread' ? 'font-semibold' : ''
                }`}>
                  {notification.message}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (notification.status === 'unread') {
                    dispatch(markAsReadAsync(notification.id));
                  }
                }}
                className={`px-2 py-1 text-xs rounded-full capitalize transition-all duration-200 ${
                  notification.status === 'unread'
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <span>{notification.status}</span>
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-right text-gray-500">
            {/* Replace with actual timestamp if available */}
            2 hours ago
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
