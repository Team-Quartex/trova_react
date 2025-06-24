import React from "react"
import { Star } from "lucide-react"

const StarRating = ({ rating = 0, editable = false, onChange = () => {} }) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onChange(star)}
          className={editable ? "cursor-pointer focus:outline-none" : ""}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300 hover:text-yellow-300"
            }`}
          />
        </button>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}

export default StarRating
