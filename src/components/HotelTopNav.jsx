import React from "react"
import { ChevronLeft, Heart, Share2 } from "lucide-react"
 const handleBack = () => {
    window.history.back();
  };

const HotelTopNav = ({ isFavorited, onFavoriteToggle, onBack }) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
          aria-label="Back to hotels"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Explorea
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={onFavoriteToggle}
            className={`p-2 rounded-full ${isFavorited ? "text-red-500" : "text-gray-400"} hover:bg-gray-100`}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100" aria-label="Share">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelTopNav
