import React from 'react';
import { 
  UserPlus, 
  CheckCircle, 
  Lock, 
  AlertTriangle, 
  Megaphone,
  Trash2,
  Check
} from 'lucide-react';

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = (type) => {
    const iconProps = { className: "w-5 h-5" };
    
    switch (type) {
      case 'user_registered':
        return <UserPlus {...iconProps} className="w-5 h-5 text-blue-600" />;
      case 'profile_update':
        return <CheckCircle {...iconProps} className="w-5 h-5 text-green-600" />;
      case 'pending_approval':
        return <Lock {...iconProps} className="w-5 h-5 text-yellow-600" />;
      case 'system_alert':
        return <AlertTriangle {...iconProps} className="w-5 h-5 text-red-600" />;
      case 'feature_announcement':
        return <Megaphone {...iconProps} className="w-5 h-5 text-purple-600" />;
      default:
        return <UserPlus {...iconProps} />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'user_registered':
        return 'bg-blue-50';
      case 'profile_update':
        return 'bg-green-50';
      case 'pending_approval':
        return 'bg-yellow-50';
      case 'system_alert':
        return 'bg-red-50';
      case 'feature_announcement':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'user_registered':
        return 'border-l-blue-500';
      case 'profile_update':
        return 'border-l-green-500';
      case 'pending_approval':
        return 'border-l-yellow-500';
      case 'system_alert':
        return 'border-l-red-500';
      case 'feature_announcement':
        return 'border-l-purple-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Icon */}
          <div className={`
            p-2 rounded-lg ${getBgColor(notification.type)} flex-shrink-0
          `}>
            {getIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className={`
                font-medium text-gray-900
                ${!notification.read ? 'font-semibold' : ''}
              `}>
                {notification.title}
              </h3>
              {!notification.read && (
                <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2 ml-2" />
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-2 leading-relaxed">
              {notification.message}
            </p>
            
            <span className="text-xs text-gray-500">
              {notification.timestamp}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Mark as read"
            >
              <Check className="w-4 h-4 text-gray-500" />
            </button>
          )}
          
          <button
            onClick={() => onDelete(notification.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
