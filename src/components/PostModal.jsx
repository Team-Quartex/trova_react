import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, MessageCircle, Share,
} from 'lucide-react';
import {
  FaSmile, FaPaperclip, FaTimesCircle,
} from 'react-icons/fa';
import { FiImage, FiSend } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';

const PostModal = ({
  isOpen,
  onClose,
  userName,
  userImage,
  images,
  date,
  description,
  likes,
  comments,
  commentText,
  setCommentText,
  attachedFiles,
  setAttachedFiles,
  handleCommentSubmit,
  handleFileChange,
  removeFile,
  fileInputRef,
  imageInputRef,
  showEmojiPicker,
  setShowEmojiPicker,
}) => {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const onEmojiClick = (emojiData) => {
    setCommentText((prev) => prev + emojiData.emoji);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-white w-full max-w-5xl max-h-[100vh] rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <img src={userImage} alt={userName} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{userName}</h2>
                <p className="text-sm text-gray-500">{date}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row h-[calc(90vh-70px)] overflow-hidden">
            {/* Image Carousel */}
            {images?.length > 0 && (
              <div className="lg:w-1/2 relative flex items-center justify-center bg-black p-4">
                <img
                  src={images[currentIndex]}
                  alt="Post content"
                  className="max-w-full max-h-[70vh] object-contain rounded-xl"
                />
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
                      onClick={prevImage}
                    >
                      ‹
                    </button>
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
                      onClick={nextImage}
                    >
                      ›
                    </button>
                    <div className="absolute bottom-3 flex gap-1">
                      {images.map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Right Side */}
            <div className="lg:w-1/2 flex flex-col p-6">
              {/* Description */}
              <div className="px-6 py-4 border-b border-gray-100 overflow-y-auto">
                <p className="text-gray-800 text-base whitespace-pre-wrap">{description}</p>
              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {[{
                  name: "Mike Chen",
                  avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
                  comment: "Amazing shot! Where was this taken?",
                  time: "2h ago"
                }, {
                  name: "Emma Davis",
                  avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
                  comment: "Love the framing!",
                  time: "1h ago"
                }].map((c, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full" />
                    <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-800">
                      <p className="font-semibold">{c.name}</p>
                      <p>{c.comment}</p>
                      <span className="text-xs text-gray-500 mt-1 block">{c.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-gray-100 px-6 py-2">
                <div className="flex gap-6 text-gray-500">
                  <button
                    className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'hover:text-red-500'}`}
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart
                      size={20}
                      fill={liked ? 'currentColor' : 'none'}
                      strokeWidth={1.8}
                    />
                    <span>{liked ? likes + 1 : likes}</span>
                  </button>
                  <button
                    className="flex items-center gap-2 text-blue-500 cursor-default"
                  >
                    <MessageCircle
                      size={20}
                      fill="currentColor"
                      strokeWidth={1.8}
                    />
                    <span>{comments}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 ${shared ? 'text-green-500' : 'hover:text-green-500'}`}
                    onClick={() => setShared(!shared)}
                  >
                    <Share
                      size={20}
                      fill={shared ? 'currentColor' : 'none'}
                      strokeWidth={1.8}
                    />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Comment Input (Always Visible) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex items-center gap-2 relative border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#52b788] transition text-sm p-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={`Comment as ${userName}`}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setTimeout(() => setInputFocused(false), 200)}
                    className="flex-grow px-4 py-2 outline-none"
                  />
                  <button type="button" onClick={() => setShowEmojiPicker(val => !val)} className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600">
                    <FaSmile size={18} />
                  </button>
                  <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600">
                    <FaPaperclip size={18} />
                  </button>
                  <button type="button" onClick={() => imageInputRef.current.click()} className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600">
                    <FiImage size={18} />
                  </button>
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!commentText.trim() && attachedFiles.length === 0}
                    className={`p-2 rounded-full ${commentText.trim() || attachedFiles.length > 0 ? 'bg-[#52b788] hover:bg-[#40916c] cursor-pointer' : 'bg-gray-300 cursor-not-allowed'} text-white transition`}
                  >
                    <FiSend size={18} />
                  </button>

                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-full mb-2 right-0 z-50">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        preload
                        searchDisabled
                        skinTonePickerDisabled
                      />
                    </div>
                  )}
                </div>

                {/* Hidden Inputs */}
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

                {/* Preview Files */}
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
                          >
                            <FaTimesCircle size={18} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostModal;
