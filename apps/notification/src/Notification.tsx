import React from 'react';

const Notification = () => {
  const [notifications] = React.useState([
    { id: 1, message: 'New ticket created', type: 'info' },
    { id: 2, message: 'Ticket #123 updated', type: 'success' },
    { id: 3, message: 'Authentication failed', type: 'error' },
  ]);

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.type}`}
          >
            <span className="notification-message">
              {notification.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
