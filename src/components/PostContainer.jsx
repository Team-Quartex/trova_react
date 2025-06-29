import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share,
  Send,
  Smile,
  Paperclip,
  Image as ImageIcon,
  X,
  MoreHorizontal,
  ThumbsUp
} from 'lucide-react';

const PostContainer = ({
  userName,
  userAvatar,
  timestamp,
  postText,
  postImage,
  likes,
  comments: initialComments,
  shares
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [commented, setCommented] = useState(false);
  
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() || attachedFiles.length > 0) {
      const newComment = {
        id: Date.now().toString(),
        userName: "You",
        userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
        text: commentText,
        timestamp: "just now",
        likes: 0
      };
      setComments(prev => [...prev, newComment]);
      setCommentText('');
      setAttachedFiles([]);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    setCommented(!commented);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl mx-auto mb-8 hover:shadow-2xl transition-all duration-300"
    >
      {/* Post Header */}
      <motion.div 
        className="p-8 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.img
              src={userAvatar}
              alt={userName}
              className="w-16 h-16 rounded-full object-cover ring-3 ring-gray-100 shadow-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <motion.h3 
                className="font-bold text-gray-900 hover:underline cursor-pointer text-xl"
                whileHover={{ color: "#1f2937", scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {userName}
              </motion.h3>
              <p className="text-base text-gray-500 font-medium">{timestamp}</p>
            </div>
          </div>
          <motion.button 
            className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <MoreHorizontal size={24} className="text-gray-600" />
          </motion.button>
        </div>
      </motion.div>

      {/* Post Content */}
      <motion.div 
        className="px-8 pb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
          {postText}
        </p>
      </motion.div>

      {/* Post Image */}
      {postImage && (
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src={postImage}
            alt="Post content"
            className="w-full object-cover max-h-[500px] rounded-2xl mx-8 shadow-lg"
            style={{ width: 'calc(100% - 4rem)' }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}

      {/* Engagement Stats */}
      <motion.div 
        className="px-8 py-4 border-b border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="flex items-center justify-between text-base text-gray-600">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="flex -space-x-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThumbsUp size={16} className="text-white" />
                </motion.div>
                <motion.div 
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.2, rotate: -360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart size={16} className="text-white fill-current" />
                </motion.div>
              </motion.div>
              <motion.span 
                className="font-semibold text-lg"
                animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {likesCount}
              </motion.span>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <motion.button 
              onClick={toggleComments}
              className="hover:underline font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {comments.length} comments
            </motion.button>
            <motion.span 
              className="font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
            >
              {shares} shares
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="px-8 py-5 border-b border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="flex items-center justify-around">
          <motion.button
            onClick={handleLike}
            className={`flex items-center space-x-3 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 flex-1 justify-center font-semibold text-lg ${
              isLiked ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: isLiked ? [1, 1.4, 1] : 1,
                rotate: isLiked ? [0, 15, -15, 0] : 0
              }}
              transition={{ duration: 0.4 }}
            >
              <ThumbsUp size={26} className={isLiked ? 'fill-current' : ''} />
            </motion.div>
            <span>Like</span>
          </motion.button>
          
          <motion.button
            onClick={toggleComments}
            className="flex items-center space-x-3 px-8 py-4 rounded-xl hover:bg-green-50 transition-all duration-300 flex-1 justify-center text-gray-600 font-semibold text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: commented ? [1, 1.4, 1] : 1,
                rotate: commented ? [0, 360] : 0
              }}
              transition={{ duration: 0.4 }}
            >
              <MessageCircle size={26} />
            </motion.div>
            <span>Comment</span>
          </motion.button>
          
          <motion.button 
            className="flex items-center space-x-3 px-8 py-4 rounded-xl hover:bg-purple-50 transition-all duration-300 flex-1 justify-center text-gray-600 font-semibold text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Share size={26} />
            </motion.div>
            <span>Share</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="border-t border-gray-100 overflow-hidden"
          >
            {/* Existing Comments */}
            <motion.div 
              className="px-8 py-6 space-y-6 max-h-96 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {comments.map((comment, index) => (
                <motion.div 
                  key={comment.id} 
                  className="flex space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="flex-1">
                    <motion.div 
                      className="bg-gray-100 rounded-2xl px-5 py-4 hover:bg-gray-200 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-semibold text-base text-gray-900">
                        {comment.userName}
                      </h4>
                      <p className="text-base text-gray-800 mt-1">{comment.text}</p>
                    </motion.div>
                    <div className="flex items-center space-x-6 mt-3 px-5">
                      <span className="text-sm text-gray-500 font-medium">{comment.timestamp}</span>
                      <motion.button 
                        className="text-sm text-gray-600 hover:underline font-semibold hover:text-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Like
                      </motion.button>
                      <motion.button 
                        className="text-sm text-gray-600 hover:underline font-semibold hover:text-green-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reply
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Input Section */}
      <AnimatePresence>
        {commented && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="p-8 pt-6 border-t border-gray-100 overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <motion.img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                alt="Your avatar"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
              <div className="flex-1">
                <motion.div 
                  className="flex items-center gap-3 relative border-2 border-gray-200 rounded-2xl focus-within:border-[#52b788] focus-within:ring-4 focus-within:ring-[#52b788]/10 transition-all duration-300 text-base p-2 bg-gray-50 hover:bg-white"
                  whileHover={{ boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={`Comment as ${userName}`}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setTimeout(() => setInputFocused(false), 200)}
                    onKeyPress={handleKeyPress}
                    className="flex-grow px-5 py-3 outline-none bg-transparent text-gray-800 placeholder-gray-500 text-base"
                  />
                  
                  <motion.button 
                    type="button" 
                    className="p-3 rounded-full hover:bg-yellow-100 transition-all duration-200 text-gray-600 hover:text-yellow-600"
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Smile size={22} />
                  </motion.button>
                  
                  <motion.button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="p-3 rounded-full hover:bg-gray-200 transition-all duration-200 text-gray-600 hover:text-gray-800"
                    whileHover={{ scale: 1.15, rotate: -15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Paperclip size={22} />
                  </motion.button>
                  
                  <motion.button 
                    type="button" 
                    onClick={() => imageInputRef.current?.click()} 
                    className="p-3 rounded-full hover:bg-blue-100 transition-all duration-200 text-gray-600 hover:text-blue-600"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ImageIcon size={22} />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleCommentSubmit}
                    disabled={!commentText.trim() && attachedFiles.length === 0}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      commentText.trim() || attachedFiles.length > 0 
                        ? 'bg-[#52b788] hover:bg-[#40916c] cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-300 cursor-not-allowed'
                    } text-white`}
                    whileHover={commentText.trim() || attachedFiles.length > 0 ? { scale: 1.15 } : {}}
                    whileTap={commentText.trim() || attachedFiles.length > 0 ? { scale: 0.9 } : {}}
                  >
                    <Send size={22} />
                  </motion.button>
                </motion.div>

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
                <AnimatePresence>
                  {attachedFiles.length > 0 && (
                    <motion.div 
                      className="mt-4 flex flex-wrap gap-4 max-w-full overflow-x-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {attachedFiles.map((file, index) => {
                        const url = URL.createObjectURL(file);
                        const isImage = file.type.startsWith('image/');
                        return (
                          <motion.div 
                            key={index} 
                            className="relative w-24 h-24 rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {isImage ? (
                              <img src={url} alt={file.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-700 text-xs p-2">
                                {file.name.substring(0, 8)}...
                              </div>
                            )}
                            <motion.button
                              onClick={() => removeFile(index)}
                              className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full hover:text-red-700 transition-colors shadow-lg"
                              whileHover={{ scale: 1.2, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={20} />
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostContainer;