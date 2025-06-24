import React from "react"

const IconLabel = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3 text-sm text-gray-600">
    <Icon className="w-4 h-4" />
    <span>{text}</span>
  </div>
)

export default IconLabel
