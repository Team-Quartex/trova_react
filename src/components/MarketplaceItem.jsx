import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const MarketplaceItem = ({ item }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>);
    }

    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`}>☆</span>);
    }

    return stars;
  };

  const handleViewItem = () => {
    const urlName = item.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/marketplace/${urlName}`);
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow p-4 flex flex-col justify-between h-full">
      {/* Top Content */}
      <div>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded-xl mb-3"
        />

        <h2 className="text-lg font-semibold mb-1">{item.name}</h2>

        <div className="flex items-center text-yellow-500 mb-1">
          {renderStars(item.rating)}
          <span className="ml-2 text-sm text-gray-600">({item.rating})</span>
        </div>

        <p className="text-sm text-gray-700 mb-2">
          {item.description?.split(" ").slice(0, 10).join(" ")}...
        </p>

        {/* Price + Favorite */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-md font-bold text-black">${item.price}</p>
          <button
            onClick={toggleFavorite}
            className="text-red-500 text-xl"
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-auto pt-2">
        <button
          onClick={handleViewItem}
          className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          View Item
        </button>
      </div>
    </div>
  );
};

export default MarketplaceItem;
