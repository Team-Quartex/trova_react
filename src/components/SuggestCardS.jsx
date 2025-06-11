import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuggestCardS = ({ name, username, img, isVerify }) => {
  return (
    <div className="w-full flex items-center justify-between p-3 bg-white shadow-md rounded-xl mt-3 transition hover:shadow-lg">
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <img
          src={img}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h1 className="font-semibold text-gray-800 text-sm">{name}</h1>
            {isVerify && (
              <FaCheckCircle className="text-blue-500 text-xs" title="Verified" />
            )}
          </div>
          <h2 className="text-gray-500 text-xs">@{username}</h2>
        </div>
      </div>

      {/* Follow Button */}
      <button className="text-sm font-medium bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition">
        Follow
      </button>
    </div>
  );
};

export default SuggestCardS;
