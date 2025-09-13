import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);

  // Mock notification data for header dropdown
  const recentNotifications = [
    {
      id: 1,
      type: 'user_registered',
      title: 'New user registered',
      message: 'James Smith has just signed up.',
      timestamp: '2 min ago',
      icon: User,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'pending_approval',
      title: 'Pending approval',
      message: 'Maria Garcia\'s role change request.',
      timestamp: '1 hour ago',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 3,
      type: 'profile_update',
      title: 'Profile updated',
      message: 'Your profile was successfully updated.',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target)) {
        setIsNotificationMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationMenuRef}>
            <button 
              onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications Dropdown Menu */}
            {isNotificationMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3 new</span>
                  </div>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {recentNotifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}>
                          <notification.icon className={`w-4 h-4 ${notification.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{notification.title}</h4>
                          <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1 transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                  <hr className="my-2 border-gray-200" />
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
