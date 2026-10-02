import React, { useState, useEffect, useContext } from 'react';
import { FiBell, FiX, FiPackage } from 'react-icons/fi';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

const StockNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/stock-notifications/unread-count`, {
        withCredentials: true
      });
      if (response.data.success) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/stock-notifications/get`, {
        withCredentials: true
      });
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.post(`${serverUrl}/api/stock-notifications/mark-read`, 
        { notificationId }, 
        { withCredentials: true }
      );
      fetchUnreadCount();
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBellClick = () => {
    setShowPanel(!showPanel);
    if (!showPanel) {
      fetchNotifications();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className="relative p-2 text-gray-600 hover:text-gray-800"
      >
        <FiBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Stock Notifications</h3>
            <button onClick={() => setShowPanel(false)}>
              <FiX size={20} />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 border-b border-gray-100 ${
                    !notification.isRead ? 'bg-red-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FiPackage className="text-red-500 mt-1" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockNotifications;