import React from "react";

const Section = ({ title, hotels = [] }) => {
  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>); // Optional: Replace with half-star icon
    }

    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`}>☆</span>);
    }

    return stars;
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-3">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow p-3 flex flex-col items-center"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />
            <h2 className="text-lg font-semibold text-center">{hotel.name}</h2>
            
            {/* Star Rating */}
            <div className="flex mb-1 text-yellow-500">
              {renderStars(hotel.rating)}
              <span className="text-sm text-gray-600 ml-1">({hotel.rating})</span>
            </div>

            <p
              className={`text-sm ${
                hotel.availability === "Sold Out"
                  ? "text-red-500"
                  : "text-green-600"
              } mb-2`}
            >
              {hotel.availability}
            </p>

            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-[#000000] text-[#000000] rounded-lg hover:bg-gray-50 transition">
                View Hotel
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-lg ${
                  hotel.availability === "Sold Out"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#000000] text-white hover:bg-gray-800"
                } transition`}
                disabled={hotel.availability === "Sold Out"}
              >
                Book Hotel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
