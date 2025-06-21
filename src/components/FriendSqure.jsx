"use client"

import { useState } from "react"

const FriendSquare = ({ username, userImage, isOnline = false, mutualFriends = 0 }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="group w-full max-w-sm mx-auto bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 flex flex-col items-center space-y-3 sm:space-y-4 border border-gray-100 hover:border-gray-200 h-full">
      {/* Online Status Indicator */}
      

      {/* Profile Image Container */}
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 md:w-28 sm:h-24 md:h-28 rounded-full bg-gradient-to-br from-green-100 to-green-100 p-1 shadow-lg">
          {!imageLoaded && (
            <div className="w-full h-full rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          )}
          <img
            src={userImage || "/placeholder.svg"}
            alt={`${username}'s profile`}
            className={`w-full h-full rounded-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>

        {/* Hover Ring Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
      </div>

      {/* User Info */}
      <div className="text-center space-y-1 px-2">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 text-center">
          {username}
        </h3>
        {mutualFriends > 0 && (
          <p className="text-sm text-gray-500">
            {mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full">
        <button
          onClick={handleFollowClick}
          className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-[50px] transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            isFollowing
              ? "bg-gray-100 text-[#000000] hover:bg-gray-200 border border-gray-300"
              : "bg-[#000000] hover:bg-gray-800 shadow-lg text-[#ffffff]"
          }`}
        >
          {isFollowing ? (
            <span className="flex items-center justify-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Following</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <span>Follow</span>
            </span>
          )}
        </button>

        <button className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-2 border-[#000000] text-[#000000] rounded-[50px] hover:bg-[#000000] hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95">
          <span className="flex items-center justify-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Profile</span>
          </span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default FriendSquare
