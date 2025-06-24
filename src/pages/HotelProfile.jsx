import { useState } from "react"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  Utensils,
} from "lucide-react"

import BookingForm from "../components/BookingForm"
import StarRating from "../components/StarRating"
import RoomCard from "../components/RoomCard"
import HotelTopNav from "../components/HotelTopNav"
import ImageGallery from "../components/ImageGallery"
import AddHotelReview from "../components/ AddHotelReview"
import ViewHotelReviews from "../components/ViewHotelReviews"

const HotelProfile = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)
  const [isFavorited, setIsFavorited] = useState(false)

  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  })
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely stunning resort! The ocean views are breathtaking and the service is impeccable. Will definitely return!",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 week ago",
      comment: "Great location and beautiful rooms. The pool area is fantastic. Only minor issue was the WiFi speed in some areas.",
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      date: "2 weeks ago",
      comment: "Perfect for a romantic getaway. The sunset views from our balcony were magical. Highly recommended!",
    },
  ])

  const hotel = {
    name: "Ocean Breeze Resort",
    rating: 4.8,
    reviewCount: 1247,
    location: "Malibu, California",
    price: 299,
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      "https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      "https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg",
      "https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg",
    ],
    description: "Experience luxury at its finest at Ocean Breeze Resort, where pristine beaches meet world-class hospitality. Our resort offers breathtaking ocean views, exceptional dining, and unparalleled comfort for the perfect getaway.",
    amenities: [
      { icon: Wifi, name: "Free WiFi" },
      { icon: Car, name: "Free Parking" },
      { icon: Coffee, name: "Restaurant" },
      { icon: Dumbbell, name: "Fitness Center" },
      { icon: Waves, name: "Swimming Pool" },
      { icon: Utensils, name: "Room Service" },
    ],
    rooms: [
      {
        id: 1,
        type: "Ocean View Suite",
        price: 399,
        image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
        features: ["King Bed", "Ocean View", "Balcony", "Mini Bar"],
        available: 3,
      },
      {
        id: 2,
        type: "Deluxe Room",
        price: 299,
        image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
        features: ["Queen Bed", "City View", "Work Desk", "Coffee Maker"],
        available: 5,
      },
      {
        id: 3,
        type: "Standard Room",
        price: 199,
        image: "https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg",
        features: ["Double Bed", "Garden View", "Air Conditioning"],
        available: 8,
      },
    ],
  }
  

  const handleBooking = () => {
    if (!selectedRoom || !checkIn || !checkOut) {
      alert("Please select a room and dates to continue booking")
      return
    }
    alert(`Booking ${selectedRoom.type} from ${checkIn} to ${checkOut} for ${guests} guests`)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("Please fill in all fields")
      return
    }
    const reviewToAdd = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: "Just now",
      comment: newReview.comment,
    }
    setReviews([reviewToAdd, ...reviews])
    setNewReview({ name: "", rating: 5, comment: "" })
    setShowReviewForm(false)
    alert("Thank you for your review!")
  }

  const handleStarClick = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HotelTopNav
        isFavorited={isFavorited}
        onFavoriteToggle={() => setIsFavorited(!isFavorited)}
        onBack={() => alert("Back to Hotels clicked")}
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <ImageGallery
              images={hotel.images}
              currentIndex={currentImageIndex}
              onPrev={() => setCurrentImageIndex((currentImageIndex - 1 + hotel.images.length) % hotel.images.length)}
              onNext={() => setCurrentImageIndex((currentImageIndex + 1) % hotel.images.length)}
              onSelect={(index) => setCurrentImageIndex(index)}
            />

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <StarRating rating={hotel.rating} />
                    <span className="text-sm font-medium text-gray-700 ml-1">{hotel.rating} ({hotel.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                      <amenity.icon className="w-5 h-5 text-[#40916c]" />
                      <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Room Types</h3>
                <div className="space-y-4">
                  {hotel.rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      isSelected={selectedRoom?.id === room.id}
                      onSelect={() => setSelectedRoom(room)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Guest Reviews ({reviews.length})</h3>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-[#2d6a4f] text-white px-4 py-2 rounded-lg hover:bg-[#40916c] transition-colors text-sm font-medium"
                  >
                    {showReviewForm ? "Cancel" : "Write a Review"}
                  </button>
                </div>

                {showReviewForm && (
                  <AddHotelReview
                    newReview={newReview}
                    onChange={(field, value) => setNewReview(prev => ({ ...prev, [field]: value }))}
                    onStarClick={handleStarClick}
                    onSubmit={handleReviewSubmit}
                  />
                )}

                <ViewHotelReviews reviews={reviews} />
              </div>
            </div>
          </div>

          <BookingForm
            selectedRoom={selectedRoom}
            hotelPrice={hotel.price}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            onBook={handleBooking}
          />
        </div>
      </div>
    </div>
  )
}

export default HotelProfile
