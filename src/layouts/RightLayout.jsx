import React from 'react'
import SuggestCardS from '../components/SuggestCardS'

const RightLayout = () => {
  return (
    <div className='w-[20vw] h-screen flex flex-col'>
        <div className='h-2/3 w-full py-2'>
            <h1 className='mx-1.5 font-bold text-lg'>Suggesions</h1>
            <div className='overflow-y-auto h-11/12 w-11/12 mx-auto p-1'>
                <SuggestCardS name={"User1"} username={"user1"} img={"images/profile.png"}/>
            </div>
        </div>
        <div className='h-1/3 w-full  bg-amber-400'></div>
    </div>
  )
}
export default RightLayout
