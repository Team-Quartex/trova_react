import React, { useState } from 'react'
import NavButton from './NavButton'

const ProfileNav = () => {
    const [activeButton,setActiveButton] = useState(0);
    const navItems = [
        { label: "NewsFeed", icon: "fi fi-sr-plane-alt" },
        { label: "Messages", icon: "fi fi-sr-envelope" },
        { label: "Friends", icon: "fi fi-sr-users" },
        { label: "Notifications", icon: "fi fi-sr-bell" },
        { label: "Settings", icon: "fi fi-sr-settings" },
    ]

  return (
    <div className='w-[20vw] h-screen bg-yellow-50 flex flex-col items-center justify-center'>
      {/* Profile image */}
      <div className='w-[12vw] h-[12vw] rounded-[50%] bg-amber-300'>
        <img src="images/profile.png" alt="profile-image" className='object-cover' />
      </div>
      <h1>Sophie Parker</h1>
      <h2>@sophieParker</h2>
      {/* Followes section */}
      <div className='w-2/3 flex justify-between'>
        <h1>0 Follower</h1>
        <h1>0 Follower</h1>
      </div>
      {/* Navigation Layer */}
      <div className='w-2/3 py-3 flex flex-col gap-3'>
        {navItems.map((item,index)=>(
            <NavButton key={index}
            lable={item.label}
            icon={item.icon}
            isActive={activeButton===index}
            onClick={()=>setActiveButton(index)}
            />
        ))}
      </div>
    </div>
  )
}

export default ProfileNav
