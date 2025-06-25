"use client"

import { useState, useEffect } from "react"
import NavButton from "./NavButton"
import { FaPlane, FaEnvelope, FaUsers, FaHotel, FaStore, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { MdAttractions, MdRestaurant } from "react-icons/md"

const ProfileNav = () => {
  const [activeButton, setActiveButton] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("profileNavCollapsed") === "true";
    }
    return false;
  });

  // Disable collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems = [
    { label: "NewsFeed", icon: <FaPlane />, route: "/" },
    { label: "Messages", icon: <FaEnvelope />, route: "/message" },
    { label: "Friends", icon: <FaUsers />, route: "/friends" },
    { label: "Hotels", icon: <FaHotel />, route: "/hotels" },
    { label: "Dayout", icon: <MdAttractions />, route: "/dayouts" },
    { label: "Resturant", icon: <MdRestaurant />, route: "/restuarants" },
    { label: "Market Place", icon: <FaStore />, route: "/marketplace" },
  ]

  const footerLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Ads", href: "/ads" },
  ]

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`${
        isCollapsed ? "w-16 md:w-20" : "w-full md:w-[60vw] lg:w-[20vw]"
      } h-full lg:h-screen bg-white flex flex-col justify-between py-6 px-4 overflow-y-auto transition-all duration-300 ease-in-out relative shadow`}
    >
      {/* Collapse/Expand Toggle Button - only on desktop */}
      <button
        onClick={toggleCollapse}
        className="absolute top-4 right-2 z-10 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-[5px] hidden lg:block"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <FaChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <FaChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <div>
        {/* Full Profile Info (Hidden if collapsed) */}
        <div
          className={`flex flex-col items-center mb-6 transition-all duration-300 ${
            isCollapsed ? "opacity-0 h-0 overflow-hidden mb-2" : "opacity-100"
          }`}
        >
          <div className="w-28 h-28 md:w-50 md:h-50 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <img src="images/profile.png" alt="profile" className="object-cover w-full h-full" />
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

        {/* Collapsed Avatar (Only if collapsed) */}
        <div
          className={`flex flex-col items-center mb-6 transition-all duration-300 ${
            isCollapsed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white">
            <img src="images/profile.png" alt="profile" className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full md:w-2/3 flex flex-col gap-1">
          {navItems.map((item, index) => (
            <NavButton
              key={index}
              route={item.route}
              label={item.label}
              icon={item.icon}
              isActive={activeButton === index}
              onClick={() => setActiveButton(index)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 select-none transition-all duration-300 ${
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        }`}
      >
        <div className="flex justify-left gap-4 flex-wrap mb-2">
          {footerLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="hover:underline cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
          <p>© {new Date().getFullYear()} Quartex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default ProfileNav
