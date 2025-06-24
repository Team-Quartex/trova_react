import React from "react"
import StarRating from "./StarRating"

const ReviewItem = ({ review }) => (
  <div className="bg-white p-4 rounded-lg border">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">{review.name.charAt(0)}</span>
        </div>
        <span className="font-medium text-gray-900">{review.name}</span>
        {review.date === "Just now" && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <StarRating rating={review.rating} />
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
    </div>
    <p className="text-gray-600">{review.comment}</p>
  </div>
)

export default ReviewItem
