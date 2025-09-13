import React, { useState } from 'react';
import { Search, Filter, MessageSquare } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NotificationItem from './components/NotificationItem';
import FilterDropdown from './components/FilterDropdown';
import Pagination from './components/Pagination';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'user_registered',
      title: 'New user registered',
      message: 'James Smith (james.s@example.com) has just signed up.',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'profile_update',
      title: 'Profile update successful',
      message: 'Your profile information has been successfully updated.',
      timestamp: '1 hour ago',
      read: true
    },
    {
      id: 3,
      type: 'pending_approval',
      title: 'Pending approval',
      message: 'Maria Garcia\'s request to change role to \'Administrator\' needs your approval.',
      timestamp: '3 hours ago',
      read: false
    },
    {
      id: 4,
      type: 'system_alert',
      title: 'System alert: High CPU usage',
      message: 'The server is experiencing high CPU usage. Please investigate.',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: 5,
      type: 'feature_announcement',
      title: 'New feature announcement',
      message: 'We\'ve just launched a new feature! Check out the details.',
      timestamp: '2 days ago',
      read: true
    }
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Unread' && !notif.read) ||
                         (statusFilter === 'Read' && notif.read);
    const matchesType = typeFilter === 'All' || notif.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">
              Notifications Management
            </h1>
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Mark all as read
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter</span>
                </div>
                
                <FilterDropdown
                  label="Status"
                  value={statusFilter}
                  options={['All', 'Read', 'Unread']}
                  onChange={setStatusFilter}
                />
                
                <FilterDropdown
                  label="Type"
                  value={typeFilter}
                  options={['All', 'user_registered', 'profile_update', 'pending_approval', 'system_alert', 'feature_announcement']}
                  onChange={setTypeFilter}
                />
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <MessageSquare className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredNotifications.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={9}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
