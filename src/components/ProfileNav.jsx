import React, { useState } from 'react'
import NavButton from './NavButton'

const ProfileNav = () => {
    const [activeButton,setActiveButton] = useState(0);
    const navItems = [
        { label: "NewsFeed", icon: "fi fi-sr-plane-alt",route:"/" },
        { label: "Messages", icon: "fi fi-sr-envelope",route:"/message" },
        { label: "Friends", icon: "fi fi-sr-users",route:"/friends" },
        { label: "Hotels", icon: "fi fi-rs-dorm-room",route:"/hotels" },
        { label: "Dayout", icon: "fi fi-br-roller-coaster",route:"/home" },
        { label: "Resturant", icon: "fi fi-br-concierge-bell",route:"/home" },
        { label: "Market Place", icon: "fi fi-rr-shop",route:"/home" },
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
      <div className='w-2/3 py-1 flex flex-col gap-1'>
        {navItems.map((item,index)=>(
            <NavButton key={index}
            route={item.route}
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
