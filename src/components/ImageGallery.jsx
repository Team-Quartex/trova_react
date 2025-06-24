import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ImageGallery = ({ images, currentIndex, onPrev, onNext, onSelect }) => {
  return (
    <div className="relative">
      <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt="Hotel"
          className="w-full h-full object-cover"
        />
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
      <div className="flex space-x-2 mt-4 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
              index === currentIndex ? "border-[#40916c]" : "border-transparent"
            }`}
          >
            <img src={image} alt="Thumbnail" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
