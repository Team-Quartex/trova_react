import React from 'react'

const SuggestCardS = ({name,username,img,isVerify}) => {
  return (
    <div className='h-[10vh] w-full  flex py-2 px-1  relative shadow rounded-2xl mt-2 items-center'>
      <img src={img} alt="" className='h-[8vh]' /> 
      <div className='flex flex-col justify-between ml-3'>
        <h1>{name}</h1>
        <h2>@{username}</h2>
      </div>
      <div className='absolute my-auto right-0.5 bg-black text-white px-2 rounded-3xl'>Follow</div>
    </div>
  )
}

export default SuggestCardS