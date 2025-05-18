import React from 'react'
import ProfileNav from '../components/ProfileNav'
import RightLayout from '../layouts/RightLayout'
import FeedLayout from '../layouts/FeedLayout'

const Home = () => {
  return (
    <div className='w-screen h-screen overflow-hidden flex '>
      <ProfileNav></ProfileNav>
      <FeedLayout></FeedLayout>
      <RightLayout></RightLayout>
    </div>
  )
}

export default Home
