import React from 'react'
import PostForm from '../components/PostForm'
import Post from '../components/Post'
import {postData} from '../assets/data'

const FeedHome = () => {
  return (
    <>
      
      <div className='h-full overflow-y-auto pb-8'>
        <PostForm></PostForm>
        {postData.map(post => (
        <Post
          key={post.id}
          userName={post.userName}
          userImage={post.userImage}
          images={post.images}
          date={post.date}
          description={post.description}
          isFollow={post.isFollow}
          isBookmark={post.isBookmark}
          likes={post.likes}
          comments={post.comments}
        />
      ))}  
      </div>
    </>
  )
}

export default FeedHome
