import React from "react"
import { Star } from "lucide-react"

const AddHotelReview = ({ newReview, onChange, onStarClick, onSubmit }) => {
  return (
    <div className="bg-[#40916c]/2 border border-[#40916c]/50 rounded-xl p-6 mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h4>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onStarClick(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    star <= newReview.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {newReview.rating} {newReview.rating === 1 ? "star" : "stars"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => onChange("comment", e.target.value)}
            rows={4}
            placeholder="Write your comments here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40916c] focus:border-transparent outline-none resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#2d6a4f] text-white px-6 py-3 rounded-lg hover:bg-[#40916c] transition-colors font-semibold"
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}

export default AddHotelReview
