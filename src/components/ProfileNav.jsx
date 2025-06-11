import React, { useState } from 'react';
import NavButton from './NavButton';
import { FaPlane, FaEnvelope, FaUsers, FaHotel, FaStore } from 'react-icons/fa';
import { MdAttractions, MdRestaurant } from 'react-icons/md';

const ProfileNav = () => {
  const [activeButton, setActiveButton] = useState(0);

  const navItems = [
    { label: "NewsFeed", icon: <FaPlane />, route: "/" },
    { label: "Messages", icon: <FaEnvelope />, route: "/message" },
    { label: "Friends", icon: <FaUsers />, route: "/friends" },
    { label: "Hotels", icon: <FaHotel />, route: "/hotels" },
    { label: "Dayout", icon: <MdAttractions />, route: "/dayouts" },
    { label: "Resturant", icon: <MdRestaurant />, route: "/restuarants" },
    { label: "Market Place", icon: <FaStore />, route: "/marketplace" },
  ];

  return (
    <div className="w-full md:w-[60vw] lg:w-[20vw] h-full lg:h-screen bg-white flex flex-col items-center justify-start py-6 px-4 overflow-y-auto">
      {/* Profile & Followers */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 md:w-50 md:h-50 rounded-full overflow-hidden shadow-lg border-4 border-white">
          <img
            src="images/profile.png"
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="mt-4 text-lg md:text-2xl font-semibold text-gray-900 text-center">Sophie Parker</h1>
        <h2 className="text-gray-500 text-sm md:text-base text-center">@sophieParker</h2>

        <div className="mt-4 flex gap-6 justify-center w-full text-center">
          <div className="cursor-pointer hover:bg-gray-200 rounded-lg px-3 py-2 transition">
            <p className="text-base md:text-xl font-bold text-gray-900">0</p>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">Followers</p>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 rounded-lg px-3 py-2 transition">
            <p className="text-base md:text-xl font-bold text-gray-900">0</p>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">Following</p>
          </div>
        </div>
      </div>

      {/* Navigation Layer */}
      <div className="w-full md:w-2/3 flex flex-col gap-1">
        {navItems.map((item, index) => (
          <NavButton
            key={index}
            route={item.route}
            label={item.label}
            icon={item.icon}
            isActive={activeButton === index}
            onClick={() => setActiveButton(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileNav;
