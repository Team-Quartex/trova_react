import React from 'react'
import ProfileNav from '../components/ProfileNav'
import RightLayout from '../layouts/RightLayout'

const Home = () => {
  return (
    <div className='w-screen h-screen overflow-hidden flex '>
      <ProfileNav></ProfileNav>
      <div className='w-[60vw] h-screen bg-yellow-300'></div>
      <RightLayout></RightLayout>
    </div>
  )
}

export default Home
