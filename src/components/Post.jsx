import React from 'react'
import PostImage from './PostImage'

const Post = ({userName,userImage,images,date,description,isFollow,isBookmark,likes,comments}) => {
  return (
    <div className='w-full  bg-green-200 mb-6 rounded-3xl py-1.5 px-4'>
      <div className='flex justify-between mb-2'>
        <div className='flex gap-4 items-center'>
          <img src={userImage} alt="" className='size-10' />
          <div className='flex flex-col'>
            <h1>{userName}</h1>
            <h3>{date}</h3>
          </div>
        </div>
        <button><i className='fi fi-rr-bookmark'></i></button>
      </div>
      <p>{description}</p>
      <PostImage images={images} />
      <div className='mt-2 flex flex-wrap gap-5'>
        <div className='flex items-center cursor-pointer gap-0.5'>
          <i className='fi fi-sr-heart'></i>
          <p>{likes}</p>
        </div>
        <div className='flex items-center cursor-pointer gap-0.5'>
          <i className='fi fi-rr-comments'></i>
          <p>{comments}</p>
        </div>
        <div className='flex items-center cursor-pointer gap-0.5'>
          <i className='fi fi-rr-share'></i>
          <p>Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post
