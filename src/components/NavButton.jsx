import React from 'react'

const NavButton = ({lable,icon,onClick,isActive=false}) => {
    const btnClass = isActive?"bg-primary text-white px-4 py-2 rounded-2xl cursor-pointer":"px-4 py-2 rounded-2xl cursor-pointer"
  return (
    <div
    onClick={onClick}
    className={btnClass + " hover:bg-primary"}
    >
        <span><i className={icon + " mr-2 "}></i></span>
      {lable}
    </div>
  )
}

export default NavButton
