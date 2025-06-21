import React from "react";
import {
  AiOutlineHeart,
  AiFillHeart
} from "react-icons/ai";
import { FiMessageCircle, FiShare2, FiSettings } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const ReelActionBar = ({
  liked,
  setLiked,
  commentsOpen,
  setCommentsOpen,
  reelData,
  showSettings,
  setShowSettings,
  videoQuality,
  setVideoQuality
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-80 p-2 flex justify-center z-50">
      <div className="flex justify-around w-full max-w-sm text-white relative">
        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center">
          {liked ? (
            <AiFillHeart size={24} className="text-red-500" />
          ) : (
            <AiOutlineHeart size={24} />
          )}
          <span className="text-[10px]">{reelData.likeCount + (liked ? 1 : 0)}</span>
        </button>
        <button onClick={() => setCommentsOpen(true)} className="flex flex-col items-center">
          <FiMessageCircle size={24} />
          <span className="text-[10px]">{reelData.commentCount}</span>
        </button>
        <button className="flex flex-col items-center">
          <FiShare2 size={24} />
          <span className="text-[10px]">{reelData.shareCount}</span>
        </button>
        <button
          onClick={() => setShowSettings((p) => !p)}
          className="flex flex-col items-center relative"
        >
          <FiSettings size={24} />
          <span className="text-[10px]">Quality</span>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full mb-2 right-0 bg-black bg-opacity-90 text-white text-xs rounded shadow p-2 space-y-1 w-28 z-50"
              >
                <button
                  onClick={() => {
                    setVideoQuality("high");
                    setShowSettings(false);
                  }}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    videoQuality === "high" ? "bg-green-600" : "hover:bg-gray-700"
                  }`}
                >
                  High Quality
                </button>
                <button
                  onClick={() => {
                    setVideoQuality("low");
                    setShowSettings(false);
                  }}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    videoQuality === "low" ? "bg-green-600" : "hover:bg-gray-700"
                  }`}
                >
                  Low Quality
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default ReelActionBar;
