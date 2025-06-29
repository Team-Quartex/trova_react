import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, Bookmark, CreditCard, Shield, Clock } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import { RatingDisplay } from '../components/RatingStars';
import DatePicker from '../components/DatePicker';
import AvailabilityChecker from '../components/AvailabilityChecker';
import Reviews from '../components/Reviews';

export default function RentalItem() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const item = {
    id: 1,
    name: "Canon EOS R5 Mirrorless Camera",
    location: "Colombo, Sri Lanka",
    price: 45,
    rating: 4.9,
    reviewCount: 89,
    description: "Rent the Canon EOS R5 for your next travel or project. This high-end mirrorless camera delivers stunning image quality, 8K video, and advanced autofocus. Includes lens options, extra batteries, and carrying case.",
    features: [
      "8K Video Recording",
      "45MP Full-Frame Sensor",
      "Dual Pixel AF",
      "Image Stabilization",
      "Flip Screen",
      "Weather-Sealed Build"
    ],
    specs: [
      "Mount: RF (EF adapter available)",
      "Includes: 2 Batteries + Charger",
      "Lens Options: 24-70mm / 70-200mm",
      "Memory Cards: 2x 128GB CFexpress",
      "Tripod: Optional Add-on",
      "Deposit: $150"
    ],
    images: [
      "https://images.pexels.com/photos/442573/pexels-photo-442573.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/233698/pexels-photo-233698.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  };

  const reviews = [
    {
      id: 1,
      name: "Ayesha Samarasinghe",
      rating: 5,
      comment: "Amazing quality! Perfect for my wildlife shoot. Lens and battery were in top condition.",
      date: "June 10, 2025",
      verified: true
    },
    {
      id: 2,
      name: "Nathan Perera",
      rating: 4,
      comment: "Smooth experience. Camera is perfect. Tripod had minor wear but still worked fine.",
      date: "June 6, 2025",
      verified: true
    },
    {
      id: 3,
      name: "Diana Fonseka",
      rating: 5,
      comment: "Superb rental service! Got all accessories and excellent support from the team.",
      date: "May 28, 2025",
      verified: true
    }
  ];

  const handleDateChange = ({ startDate: newStartDate, endDate: newEndDate }) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setIsAvailable(null);
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return days * item.price;
  };

  const handleRentNow = () => {
    if (!isAvailable) {
      alert('Please check availability first');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select rental dates');
      return;
    }

    alert(`Proceeding to payment for ${item.name}\nDates: ${startDate.toDateString()} - ${endDate.toDateString()}\nTotal: $${calculateTotalPrice()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                title="Go Back"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Title & Rating */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h1>
                <RatingDisplay rating={item.rating} reviewCount={item.reviewCount} size="lg" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full border-2 transition-all duration-200 ${
                  isLiked
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-white border-gray-200 text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-full border-2 transition-all duration-200 ${
                  isBookmarked
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                    : 'bg-white border-gray-200 text-gray-400 hover:text-yellow-600'
                }`}
              >
                <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button className="p-3 rounded-full border-2 border-gray-200 bg-white text-gray-400 hover:text-blue-500 transition-all duration-200">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <ImageCarousel images={item.images} location={item.location} />

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Item</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {item.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
                <div className="flex flex-wrap gap-3">
                  {item.specs.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Reviews reviews={reviews} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-800">
                    ${item.price}
                    <span className="text-lg font-normal text-gray-500">/ day</span>
                  </div>
                </div>

                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={handleDateChange}
                />

                <div className="mt-6">
                  <AvailabilityChecker
                    startDate={startDate}
                    endDate={endDate}
                    onAvailabilityCheck={setIsAvailable}
                  />
                </div>

                {startDate && endDate && (
                  <div className="mt-6 space-y-3 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between text-gray-700">
                      <span>${item.price} × {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days</span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Service fee</span>
                      <span>${Math.round(calculateTotalPrice() * 0.1)}</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>${calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.1)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleRentNow}
                  disabled={!isAvailable}
                  className="w-full mt-6 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:transform-none text-lg"
                >
                  <CreditCard className="h-6 w-6" />
                  {isAvailable ? 'Rent Now' : 'Check Availability First'}
                </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span>Instant booking confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
