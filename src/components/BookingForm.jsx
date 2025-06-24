
import React from "react"
import { Calendar, Users } from "lucide-react"
import IconInput from "./ IconInput"
import IconSelect from "./IconSelect"
import IconLabel from "./IconLabel"
import { Phone, Mail } from "lucide-react"

const BookingForm = ({
  selectedRoom,
  hotelPrice,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  onBook,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="bg-white rounded-2xl shadow-lg p-6 ">

      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-3xl font-bold text-gray-900">${selectedRoom ? selectedRoom.price : hotelPrice}</span>
          <span className="text-gray-600">per night</span>
        </div>
        {selectedRoom && <p className="text-sm text-[#40916c] font-medium">{selectedRoom.type}</p>}
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <IconInput icon={Calendar} type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <IconInput icon={Calendar} type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <IconSelect icon={Users} value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </IconSelect>
        </div>
      </div>

      <button onClick={onBook} className="w-full bg-[#2d6a4f] text-white font-semibold py-3 rounded-lg hover:bg-[#40916c] transition-colors mb-4 cursor-pointer">
        Book Now
      </button>
      <div className="text-center text-sm text-gray-600 mb-4">You won't be charged yet</div>

      <div className="border-t pt-4 space-y-3">
        <h4 className="font-semibold text-gray-900">Contact Hotel</h4>
        <IconLabel icon={Phone} text="+1 (555) 123-4567" />
        <IconLabel icon={Mail} text="info@oceanbreeze.com" />
      </div>
      </div>
      </div>
    </div>
  )
}

export default BookingForm
