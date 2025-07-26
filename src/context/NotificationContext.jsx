import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [permission, setPermission] = useState(Notification.permission);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications);
        // Convert timestamp strings back to Date objects
        const notificationsWithDates = parsedNotifications.map(notif => ({
          ...notif,
          timestamp: new Date(notif.timestamp)
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error('Error loading notifications from localStorage:', error);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if ('Notification' in window && permission === 'default') {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
      });
    }
  }, [permission]);

  const sendNotification = (title, body, icon = null) => {
    if (permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: icon || '/vite.svg',
        badge: '/vite.svg'
      });

      // Add to internal notifications list
      const newNotification = {
        id: Date.now(),
        title,
        body,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);

      // Auto close after 4 seconds
      setTimeout(() => {
        notification.close();
      }, 4000);

      return notification;
    } else if (permission === 'denied') {
      alert('Notifications are blocked. Please enable them in your browser settings.');
    } else {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        if (perm === 'granted') {
          sendNotification(title, body, icon);
        }
      });
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ 
      sendNotification, 
      permission, 
      notifications, 
      markAsRead, 
      clearNotifications,
      isModalOpen,
      openModal,
      closeModal
    }}>
      {children}
    </NotificationContext.Provider>
  );
};