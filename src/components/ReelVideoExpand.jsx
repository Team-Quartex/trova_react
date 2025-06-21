import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const ReelVideoExpand = ({
  videoRef,
  reelData,
  isPlaying,
  isBuffering,
  showPlayPauseIcon,
  togglePlayPause
}) => {
  return (
    <div
      className="w-full max-w-md md:max-w-lg relative"
      style={{ aspectRatio: "9/16" }}
      onClick={togglePlayPause}
    >
      <video
        ref={videoRef}
        src={reelData.src}
        autoPlay
        muted
        preload="metadata"
        className="w-full h-full object-contain rounded-md"
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        }}
      />
      <AnimatePresence>
        {showPlayPauseIcon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            {isPlaying ? (
              <FaPause size={48} className="opacity-80" />
            ) : (
              <FaPlay size={48} className="opacity-80" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBuffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md"
          >
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReelVideoExpand;
