"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  Check,
  CheckCheck,
  Trash2,
  Heart,
  MessageCircle,
  UserPlus,
  Star,
  Settings,
  ArrowLeft,
} from "lucide-react"

const FeedNotification = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNotifications, setSelectedNotifications] = useState([])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      user: "Sarah Johnson",
      action: "liked your post",
      content: "Amazing sunset photography! The colors are absolutely stunning.",
      time: "2 minutes ago",
      read: false,
      avatar: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
      postImage: "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg",
    },
    {
      id: 2,
      type: "comment",
      user: "Mike Chen",
      action: "commented on your photo",
      content: "Great composition! What camera did you use for this shot?",
      time: "15 minutes ago",
      read: false,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      postImage: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
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
      content: "Check out @yourname's latest work! Absolutely incredible talent.",
      time: "3 hours ago",
      read: true,
      avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
      postImage: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg",
    },
    {
      id: 5,
      type: "star",
      user: "Lisa Park",
      action: "starred your repository",
      content: "react-photo-gallery - A beautiful React component for photo galleries",
      time: "1 day ago",
      read: true,
      avatar: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
    },
    {
      id: 6,
      type: "like",
      user: "David Kim",
      action: "liked your comment",
      content: "Thanks for the helpful feedback on the design patterns!",
      time: "2 days ago",
      read: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      type: "comment",
      user: "Rachel Green",
      action: "replied to your comment",
      content: "I completely agree with your perspective on modern web design.",
      time: "3 days ago",
      read: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: notifications.filter((n) => !n.read).length },
    { id: "like", label: "Likes", count: notifications.filter((n) => n.type === "like").length },
    { id: "comment", label: "Comments", count: notifications.filter((n) => n.type === "comment").length },
    { id: "follow", label: "Follows", count: notifications.filter((n) => n.type === "follow").length },
  ]

  const getNotificationIcon = (type) => {
    const iconProps = { size: 18, className: "text-white" }
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

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      activeFilter === "all" || (activeFilter === "unread" && !notification.read) || notification.type === activeFilter

    const matchesSearch =
      searchQuery === "" ||
      notification.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((notif) => !selectedNotifications.includes(notif.id)))
    setSelectedNotifications([])
  }

  const toggleSelectNotification = (id) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map((n) => n.id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen">
      {/* Header */}
  

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40916c] focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id ? "bg-[#40916c] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-[#40916c] font-medium">{selectedNotifications.length} selected</span>
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 px-3 py-1 bg-[#40916c] text-white text-sm rounded-md hover:bg-[#40916c]/90 transition-colors"
              >
                <CheckCheck size={16} />
                Mark as read
              </button>
              <button
                onClick={deleteSelected}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {searchQuery ? "Try adjusting your search terms" : "You're all caught up!"}
              </p>
            </div>
          ) : (
            <>
              {/* Select All */}
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <button onClick={selectAll} className="text-sm text-[#40916c] hover:text-[#40916c]/90 font-medium">
                  Select all visible
                </button>
              </div>

              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors relative ${
                    !notification.read ? "bg-blue-50" : ""
                  } ${index === filteredNotifications.length - 1 ? "border-b-0" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelectNotification(notification.id)}
                      className="mt-1 w-4 h-4 text-[#40916c] border-gray-300 rounded focus:ring-[#40916c] bg-[#40916c]"
                    />

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
                          <p className="text-gray-900 mb-1">
                            <span className="font-semibold">{notification.user}</span>{" "}
                            <span className="text-gray-600">{notification.action}</span>
                          </p>
                          {notification.content && (
                            <p className="text-gray-700 mb-2 leading-relaxed">{notification.content}</p>
                          )}
                          <p className="text-sm text-gray-500">{notification.time}</p>
                        </div>

                        {/* Post Preview */}
                        {notification.postImage && (
                          <div className="ml-4 flex-shrink-0">
                            <img
                              src={notification.postImage || "/placeholder.svg"}
                              alt="Post preview"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-3">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-[#40916c] hover:bg-[#40916c]/10 rounded-md transition-colors"
                          >
                            <Check size={14} />
                            Mark as read
                          </button>
                        )}
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                          View post
                        </button>
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute left-2 top-8 w-2 h-2 bg-[#40916c] rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Load more notifications
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedNotification
