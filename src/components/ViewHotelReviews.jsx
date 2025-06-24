import React from "react"
import StarRating from "./StarRating"

const ViewHotelReviews = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{review.name}</h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default ViewHotelReviews
