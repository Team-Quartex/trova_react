import React from 'react'
import PostForm from '../components/PostForm'
import Post from '../components/Post'

const FeedHome = () => {
  return (
    <>
      
      <div className='h-full overflow-y-auto'>
        <PostForm></PostForm>
        <Post userName = {"Sphoie"} userImage = {"images/profile.png"} images = {["/images/sgiriya.jpg",]} date = {"November 25"} description = {"hello word"} isFollow= {false} isBookmark = {false} likes = {50} comments = {0} />
        <Post userName = {"Sphoie"} userImage = {"images/profile.png"} images = {["/images/sgiriya.jpg","/images/sgiriya.jpg"]} date = {"November 25"} description = {"hello word"} isFollow= {false} isBookmark = {false} likes = {50} comments = {0} />
        <Post userName = {"Sphoie"} userImage = {"images/profile.png"} images = {["/images/sgiriya.jpg",,"/images/sgiriya.jpg","/images/sgiriya.jpg",]} date = {"November 25"} description = {"hello word"} isFollow= {false} isBookmark = {false} likes = {50} comments = {0} />
      </div>
    </>
  )
}

export default FeedHome
