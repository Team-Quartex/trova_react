import React from 'react'
import { Link } from 'react-router-dom'

const NavButton = ({ label, icon, onClick, isActive = false, route }) => {
  const btnClass = isActive
    ? "bg-primary text-white px-4 py-2 rounded-2xl cursor-pointer"
    : "px-4 py-2 rounded-2xl cursor-pointer hover:bg-primary hover:text-[#ffffff] transition ease-in-out duration-300";

  return (
    <Link
      to={route}
      onClick={onClick}
      className={`flex items-center gap-2 ${btnClass}`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

export default NavButton
