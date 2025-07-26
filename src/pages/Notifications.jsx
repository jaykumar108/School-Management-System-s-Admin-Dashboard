import React from 'react';
import { Bell, Send, Users, Calendar, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Notifications = () => {
  const { sendNotification, notifications, markAsRead, clearNotifications } = useNotification();

  const handleSendDemoNotification = () => {
    const titles = [
      'Welcome to EduAdmin!',
      'New Assignment Posted',
      'Parent-Teacher Meeting Reminder',
      'Grade Report Available',
      'School Event Update'
    ];
    
    const bodies = [
      'Your school management dashboard is ready to use.',
      'A new assignment has been posted for Mathematics class.',
      'Don\'t forget about the parent-teacher meeting tomorrow at 2 PM.',
      'Your quarterly grade report is now available for download.',
      'The science fair has been rescheduled to next Friday.'
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
    
    sendNotification(randomTitle, randomBody);
  };

  const notificationTemplates = [
    {
      id: 1,
      title: 'Assignment Reminder',
      body: 'Remind students about upcoming assignment deadlines',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Grade Publication',
      body: 'Notify parents when new grades are available',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'School Event',
      body: 'Inform about upcoming school events and activities',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Emergency Alert',
      body: 'Send urgent notifications to all users',
      icon: AlertCircle,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Notifications Center</h1>
        <button
          onClick={handleSendDemoNotification}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Send className="h-4 w-4" />
          <span>Send Demo Notification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Send className="h-5 w-5 mr-2 text-blue-600" />
            Send Notification
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Users</option>
                <option>Students Only</option>
                <option>Teachers Only</option>
                <option>Parents Only</option>
                <option>Administrators</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="Notification title..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Notification message..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Now</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule Later
              </button>
            </div>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h2>
          <div className="space-y-3">
            {notificationTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div key={template.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className={`${template.color} p-2 rounded-lg mr-3`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{template.title}</h3>
                    <p className="text-sm text-gray-600">{template.body}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Use Template
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notification History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-600" />
            Recent Notifications ({notifications.length})
          </h2>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center space-x-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications sent yet</p>
            <p className="text-sm text-gray-400">Use the "Send Demo Notification" button to test the system</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start p-4 rounded-lg border transition-colors ${
                  notification.read 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className={`p-2 rounded-full mr-3 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}>
                  <Bell className={`h-4 w-4 ${notification.read ? 'text-gray-600' : 'text-white'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {notification.timestamp.toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;