import React from "react"

const RoomCard = ({ room, isSelected, onSelect }) => {
  return (
    <div
      className={`p-4 border rounded-xl cursor-pointer transition-all ${
        isSelected ? "border-[#40916c] bg-[#40916c]/10" : "border-[#40916c] bg-white hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-4">
        <img
          src={room.image || "/placeholder.svg"}
          alt={room.type}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{room.type}</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {room.features.map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{room.available} rooms available</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">${room.price}</p>
          <p className="text-sm text-gray-600">per night</p>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
