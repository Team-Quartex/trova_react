"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Heart, MessageCircle, UserPlus, Star, X, Check } from "lucide-react"

const NotificationPanel = ({ onClick }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      user: "Sarah Johnson",
      action: "liked your post",
      content: "Amazing sunset photography!",
      time: "2 min ago",
      read: false,
      avatar: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
    },
    {
      id: 2,
      type: "comment",
      user: "Mike Chen",
      action: "commented on your photo",
      content: "Great composition! What camera did you use?",
      time: "15 min ago",
      read: false,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 3,
      type: "follow",
      user: "Emma Wilson",
      action: "started following you",
      content: "",
      time: "1 hour ago",
      read: true,
      avatar: "https://images.pexels.com/photos/2887718/pexels-photo-2887718.jpeg",
    },
    {
      id: 4,
      type: "mention",
      user: "Alex Rodriguez",
      action: "mentioned you in a comment",
      content: "Check out @yourname's latest work!",
      time: "3 hours ago",
      read: true,
      avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
    },
    {
      id: 5,
      type: "star",
      user: "Lisa Park",
      action: "starred your repository",
      content: "react-photo-gallery",
      time: "1 day ago",
      read: true,
      avatar: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
    },
  ])

  const getNotificationIcon = (type) => {
    const iconProps = { size: 16, className: "text-white" }
    switch (type) {
      case "like":
        return <Heart {...iconProps} fill="currentColor" />
      case "comment":
        return <MessageCircle {...iconProps} />
      case "follow":
        return <UserPlus {...iconProps} />
      case "mention":
        return <Bell {...iconProps} />
      case "star":
        return <Star {...iconProps} fill="currentColor" />
      default:
        return <Bell {...iconProps} />
    }
  }

  const getIconBgColor = (type) => {
    switch (type) {
      case "like":
        return "bg-red-500"
      case "comment":
        return "bg-blue-500"
      case "follow":
        return "bg-green-500"
      case "mention":
        return "bg-purple-500"
      case "star":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="absolute w-96 max-h-[800px] bg-white z-50 right-0 mt-0.5 shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-gray-600" />
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[#40916c] hover:text-[#40916c]/90 text-sm font-medium transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No notifications</p>
            <p className="text-gray-400 text-sm">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors relative group ${
                !notification.read ? "bg-[#40916c]/10" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={notification.avatar || "/placeholder.svg"}
                    alt={notification.user}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center ${getIconBgColor(notification.type)}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{notification.user}</span>{" "}
                        <span className="text-gray-600">{notification.action}</span>
                      </p>
                      {notification.content && (
                        <p className="text-sm text-gray-500 mt-1 truncate">{notification.content}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          title="Mark as read"
                        >
                          <Check size={14} className="text-green-600" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        title="Remove notification"
                      >
                        <X size={14} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unread indicator */}
                {!notification.read && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#40916c] rounded-full"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <Link
          to="/notifications"
          onClick={onClick}
          className="block w-full text-center py-3 px-6 bg-[#40916c] hover:bg-[#40916c]/80 text-white font-medium rounded-lg transition-colors"
        >
          View All Notifications
        </Link>
      </div>
    </div>
  )
}

export default NotificationPanel
