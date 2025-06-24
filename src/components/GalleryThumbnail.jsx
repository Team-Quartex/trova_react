import React from "react"

const GalleryThumbnail = ({ image, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
      isActive ? "border-blue-500" : "border-transparent"
    }`}
  >
    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
  </button>
)

export default GalleryThumbnail
