import React, { useState, useRef } from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaCommentDots,
  FaSmile,
  FaPaperclip,
  FaTimesCircle
} from 'react-icons/fa';
import { FiShare, FiSend, FiImage } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';  // Import emoji picker
import PostImage from './PostImage';
import VerifiedBadge from '../components/VerifiedBadge';

const Post = ({ userName, userImage, images, date, description, likes, comments }) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [shared, setShared] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log("User comment:", commentText);
      console.log("Attached files:", attachedFiles);
      setCommented(true);
      setCommentText("");
      setAttachedFiles([]);
      setInputFocused(false);
      setShowEmojiPicker(false);
    }
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...filesArray]);
    e.target.value = null; // Reset input so same file can be selected again if needed
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onEmojiClick = (emojiData) => {
    setCommentText(prev => prev + emojiData.emoji);
  };

  return (
    <div className='w-full bg-white mb-6 rounded-3xl py-3 px-4 border border-gray-200 max-w-xl mx-auto sm:max-w-full'>
      {/* User Header */}
      <div className='flex justify-between mb-2 flex-wrap items-center'>
        <div className='flex gap-4 items-center flex-shrink-0'>
          <img src={userImage} alt="" className='w-12 h-12 rounded-full object-cover' />
          <div className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <h1 className='text-lg sm:text-xl font-bold'>{userName}</h1>
              <VerifiedBadge size="13px" />
            </div>
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
        <div onClick={() => setLiked(!liked)} className='flex items-center cursor-pointer gap-2 select-none'>
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <p>{liked ? 'Liked' : likes}</p>
        </div>
        <div onClick={() => setCommented(!commented)} className='flex items-center cursor-pointer gap-2 select-none'>
          {commented ? <FaCommentDots className="text-blue-500" /> : <FaRegCommentDots />}
          <p>{commented ? 'Commented' : comments}</p>
        </div>
        <div onClick={() => setShared(!shared)} className='flex items-center cursor-pointer gap-2 select-none'>
          {shared ? <FaShareSquare className="text-green-500" /> : <FiShare />}
          <p>{shared ? 'Shared' : 'Share'}</p>
        </div>
      </div>

      {/* Comment Input with Emoji Picker & Attachments */}
      <AnimatePresence>
        {commented && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="flex items-center gap-2 relative border border-gray-300 rounded-full
                  focus:outline-none focus:ring-1 focus:ring-[#52b788] transition text-sm p-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={`Comment as ${userName}`}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setTimeout(() => setInputFocused(false), 200)} // small delay for buttons
                className="flex-grow px-4 py-2 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(val => !val)}
                className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
                aria-label="Toggle Emoji Picker"
              >
                <FaSmile size={18} />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
                aria-label="Attach File"
              >
                <FaPaperclip size={18} />
              </button>
              <button
                type="button"
                onClick={() => imageInputRef.current.click()}
                className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
                aria-label="Attach Image"
              >
                <FiImage size={18} />
              </button>
              <button
                onClick={handleCommentSubmit}
                disabled={!commentText.trim() && attachedFiles.length === 0}
                className={`p-2 rounded-full
                  ${(commentText.trim() || attachedFiles.length > 0)
                    ? 'bg-[#52b788] hover:bg-[#40916c] cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'}
                  text-white transition`}
                aria-label="Post Comment"
              >
                <FiSend size={18} />
              </button>

              {/* Emoji picker popup */}
              {showEmojiPicker && (
                <div className="absolute bottom-full mb-2 right-0 z-50">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    preload={true}
                    searchDisabled={true}
                    skinTonePickerDisabled={true}
                  />
                </div>
              )}
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Preview attached files */}
            {attachedFiles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3 max-w-full overflow-x-auto">
                {attachedFiles.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  const isImage = file.type.startsWith('image/');
                  return (
                    <div key={index} className="relative w-20 h-20 rounded-md border border-gray-300 overflow-hidden">
                      {isImage ? (
                        <img src={url} alt={file.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-700 text-xs p-1 break-words">
                          {file.name}
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 text-red-500 bg-white rounded-full hover:text-red-700 transition"
                        aria-label="Remove file"
                      >
                        <FaTimesCircle size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Post;
