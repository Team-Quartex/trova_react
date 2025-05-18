import React from 'react'
import PostForm from '../components/PostForm'
import Post from '../components/Post'

const FeedLayout = () => {
  return (
    <div className='w-[60vw] h-screen px-3 pt-2 '>
      <div className='flex justify-between items-center mb-2 px-1'>
        <h1 className='text-2xl font-bold'>Feed</h1>
          <div className='flex items-center justify-center'>
            <button className='bg-primary p-2 rounded-[50%]'>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E"
              alt="Search" width="20" height="20" />
          </button>
          </div>
      </div>
      <div className='h-full overflow-y-auto'>
        <PostForm></PostForm>
        <Post userName = {"Sphoie"} userImage = {"images/profile.png"} images = {["/images/sgiriya.jpg",]} date = {"November 25"} description = {"hello word"} isFollow= {false} isBookmark = {false} likes = {50} comments = {0} />
        <Post userName = {"Sphoie"} userImage = {"images/profile.png"} images = {["/images/sgiriya.jpg","/images/sgiriya.jpg"]} date = {"November 25"} description = {"hello word"} isFollow= {false} isBookmark = {false} likes = {50} comments = {0} />
        <Post userName = {"Sphoie"} userImage = {"images/profile.png"} images = {["/images/sgiriya.jpg",,"/images/sgiriya.jpg","/images/sgiriya.jpg",]} date = {"November 25"} description = {"hello word"} isFollow= {false} isBookmark = {false} likes = {50} comments = {0} />
      </div>
    </div>
  )
}

export default FeedLayout
