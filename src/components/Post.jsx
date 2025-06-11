import React, { useState } from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaCommentDots
} from 'react-icons/fa6';
import { FiShare, FiSend } from 'react-icons/fi';
import { FaShareSquare } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import PostImage from './PostImage';

const Post = ({ userName, userImage, images, date, description, likes, comments }) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [shared, setShared] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log("User comment:", commentText);
      setCommented(true);
      setCommentText("");
    }
  };

  return (
    <div className='w-full bg-white mb-6 rounded-3xl py-3 px-4 border border-gray-200
                    max-w-xl mx-auto
                    sm:max-w-full
                    '>
      {/* User Header */}
      <div className='flex justify-between mb-2 flex-wrap items-center'>
        <div className='flex gap-4 items-center flex-shrink-0'>
          <img src={userImage} alt="" className='w-12 h-12 rounded-full object-cover' />
          <div className='flex flex-col'>
            <h1 className='text-lg sm:text-xl font-bold'>{userName}</h1>
            <h3 className='text-xs sm:text-sm text-gray-600'>{date}</h3>
          </div>
        </div>
        <button className='mt-2 sm:mt-0 p-1 rounded hover:bg-gray-200 transition'>
          <i className='fi fi-rr-bookmark'></i>
        </button>
      </div>

      {/* Description */}
      <div className='my-1.5 text-sm sm:text-base'>
        <p>{description}</p>
      </div>

      {/* Image */}
      <PostImage images={images} />

      {/* Actions */}
      <div className='mt-3 flex flex-wrap gap-6 text-sm sm:text-[16px] font-medium'>
        <div
          onClick={() => setLiked(!liked)}
          className='flex items-center cursor-pointer gap-2 select-none'
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <p>{liked ? 'Liked' : likes}</p>
        </div>

        <div
          onClick={() => setCommented(!commented)}
          className='flex items-center cursor-pointer gap-2 select-none'
        >
          {commented ? <FaCommentDots className="text-blue-500" /> : <FaRegCommentDots />}
          <p>{commented ? 'Commented' : comments}</p>
        </div>

        <div
          onClick={() => setShared(!shared)}
          className='flex items-center cursor-pointer gap-2 select-none'
        >
          {shared ? <FaShareSquare className="text-green-500" /> : <FiShare />}
          <p>{shared ? 'Shared' : 'Share'}</p>
        </div>
      </div>

      {/* 🗨️ Comment Input with Animation */}
      <AnimatePresence>
        {commented && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex items-center gap-2"
          >
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full
                         focus:outline-none focus:ring-1 focus:ring-[#52b788] transition text-sm"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
              className={`p-2 rounded-full
                ${commentText.trim()
                  ? 'bg-[#52b788] hover:bg-[#40916c] cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'}
                text-white transition`}
              aria-label="Post Comment"
            >
              <FiSend size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Post;
