"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, UserPlus, Eye } from "lucide-react"

const UserHoverCard = ({ user, position = "top-full left-0", onFollow, onViewProfile }) => {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false)
  const [recentPosts, setRecentPosts] = useState([])

  // Simulate fetching recent posts
  useEffect(() => {
    // Mock recent posts data - in real app, this would be an API call
    const mockPosts = [
  {
    id: 1,
    image: "https://picsum.photos/id/237/300/300",
    likes: 24,
    comments: 3,
    type: "image",
  },
  {
    id: 2,
    image: "https://picsum.photos/id/238/300/300",
    likes: 18,
    comments: 7,
    type: "image",
  },
  {
    id: 3,
    image: "https://picsum.photos/id/239/300/300",
    likes: 31,
    comments: 2,
    type: "image",
  },
  {
    id: 4,
    image: "https://picsum.photos/id/240/300/300",
    likes: 12,
    comments: 1,
    type: "video",
  },
]
    setRecentPosts(mockPosts)
  }, [user?.id])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    onFollow?.(user?.id, !isFollowing)
  }

  const handleViewProfile = () => {
    onViewProfile?.(user?.id)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
      className={`absolute ${position} z-50 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100`}
    >
      {/* Header Section */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user?.image || "/placeholder.svg?height=56&width=56"}
              alt={user?.name || "User"}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            {user?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg truncate">{user?.name || "Unknown User"}</h3>
            <p className="text-sm text-gray-600 truncate">{user?.username ? `@${user.username}` : user?.about}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{formatNumber(user?.followers || 0)}</span> followers
              </span>
              <span className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{formatNumber(user?.following || 0)}</span> following
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Recent Posts</h4>
            <span className="text-xs text-gray-500">{recentPosts.length} posts</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {recentPosts.slice(0, 4).map((post) => (
              <div key={post.id} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
               <img
  src={post.image || "/placeholder.svg"}
  alt={`Post ${post.id}`}
  className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
/>
                {post.type === "video" && (
                  <div className="absolute top-1 right-1">
                    <div className="w-4 h-4 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-2 border-l-white border-y-1 border-y-transparent ml-0.5"></div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-black/40 transition-all duration-150 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-2 text-white text-xs">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4">
        <div className="flex gap-2">
          <button
            onClick={handleViewProfile}
            className="flex-1 flex items-center justify-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl transition-colors duration-150 font-medium hover:scale-[1.01] active:scale-[0.99] transform"
          >
            <Eye className="w-4 h-4" />
            View Profile
          </button>
          <button
            onClick={handleFollow}
            className={`flex-1 flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl transition-colors duration-150 font-medium hover:scale-[1.01] active:scale-[0.99] transform ${
              isFollowing ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : "bg-black hover:bg-gray-800 text-white"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      {/* Hover indicator arrow */}
      <div className="absolute -top-2 left-4">
        
      </div>
    </motion.div>
  )
}

export default UserHoverCard
