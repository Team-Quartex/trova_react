import React from 'react'
import { Link } from 'react-router-dom'

const NavButton = ({lable,icon,onClick,isActive=false,route}) => {
    const btnClass = isActive?"bg-primary text-white px-4 py-2 rounded-2xl cursor-pointer":"px-4 py-2 rounded-2xl cursor-pointer"
  return (
    <Link to={route}
    onClick={onClick}
    className={btnClass + " hover:bg-primary"}
    >
        <span><i className={icon + " mr-2 "}></i></span>
      {lable}
    </Link>
  )
}

export default NavButton
