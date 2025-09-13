import React from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Menu
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard1', active: false },
    { icon: UserCheck, label: 'Role Management', active: false },
    { icon: Users, label: 'User Management', active: false },
    { icon: Bell, label: 'Notifications', active: true },
    { icon: Settings, label: 'System Settings', active: false },
    { icon: User, label: 'Profile Management', active: false },
    { icon: LogOut, label: 'Logout', active: false }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-slate-800 text-white z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto lg:h-screen
        w-64 flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-1 hover:bg-slate-700 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${item.active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
