import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiX,
  FiMessageCircle,
  FiSend,
  FiShare2,
  FiImage,
  FiSettings,
} from "react-icons/fi";
import {
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import {
  FaSmile,
  FaPaperclip,
  FaTimesCircle,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";

const ReelPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reelId = Number(id);
  const videoRef = useRef();

  const userName = "You";

  const [comments, setComments] = useState([
    { user: "Author", text: "@followers Shambhavi Singh @highlight" },
    { user: "Nayaj Husain", text: "❤️‍🔥" },
    { user: "Nayaj Husain", text: "🐷💋" },
  ]);
  const [liked, setLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const [videoQuality, setVideoQuality] = useState("high");
  const [showSettings, setShowSettings] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const fileInputRef = useRef();
  const imageInputRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.load();
    video.play();
    setIsPlaying(true);

    const handleWaiting = () => setIsBuffering(true);
    const handleStalled = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    const handleCanPlay = () => setIsBuffering(false);

    const handleProgress = () => {
      const buffered = video.buffered;
      const currentTime = video.currentTime;
      let isBuffered = false;

      for (let i = 0; i < buffered.length; i++) {
        if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
          isBuffered = true;
          break;
        }
      }
      setIsBuffering(!isBuffered);
    };

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [videoQuality, reelId]);

  const handleCommentSubmit = () => {
    if (commentText.trim() || attachedFiles.length > 0) {
      setComments((prev) => [...prev, { user: userName, text: commentText }]);
      setCommentText("");
      setAttachedFiles([]);
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiData) => {
    setCommentText((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = (e) => {
    setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowPlayPauseIcon(true);
    setTimeout(() => setShowPlayPauseIcon(false), 500);
  };

  const reelData = {
    id: reelId,
    src:
      videoQuality === "high"
        ? "https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4"
        : "https://videos.pexels.com/video-files/856039/856039-hd_720_1280_25fps.mp4",
    caption: "Latino 🥺💫 #fypシ #viralシ #reelsviralシ #exploremore #diva #explore",
    creator: "Jessica Arden",
    audio: "Despacito by Luis Fonsi",
    likeCount: 20,
    commentCount: comments.length,
    shareCount: 10,
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col md:flex-row overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-3 left-3 z-50 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
      >
        <FiX size={28} />
      </button>

      <div className="flex-grow flex items-center justify-center relative p-2">
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
                setIsPlaying(true);
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

        <div className="absolute bottom-20 w-full max-w-md md:max-w-lg px-3 text-white">
          <div className="flex items-center gap-2 mb-1">
            <img
              src="https://i.pravatar.cc/24?img=5"
              alt="creator"
              className="w-7 h-7 rounded-full"
            />
            <span className="font-semibold text-sm">{reelData.creator}</span>
            <button className="ml-auto text-xs bg-white text-black rounded px-2 py-1 hover:bg-gray-200">
              Follow
            </button>
          </div>
          <p className="text-xs">{reelData.caption}</p>
          <p className="text-[10px] text-gray-300">🎵 {reelData.audio}</p>
        </div>
      </div>

      <AnimatePresence>
        {commentsOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex fixed right-0 top-0 h-full w-96 bg-white flex-col shadow-lg z-50"
          >
            {renderCommentsPanel()}
          </motion.div>
        )}
      </AnimatePresence>

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

      <AnimatePresence>
        {commentsOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed bottom-0 left-0 w-full h-1/2 bg-white flex-col shadow-lg z-50 rounded-t-lg overflow-hidden"
          >
            {renderCommentsPanel()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function renderCommentsPanel() {
    return (
      <>
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="font-bold">Comments</h2>
          <button onClick={() => setCommentsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-3 space-y-2 bg-gray-50">
          {comments.map((c, i) => (
            <div key={i} className="bg-white p-2 rounded shadow-sm text-sm">
              <span className="font-semibold">{c.user}:</span> {c.text}
            </div>
          ))}
        </div>
        {/* Your full comment input bar code from earlier */}
        {/* ... (same as before, I can include it in full if you'd like!) */}
      </>
    );
  }
};

export default ReelPlayer;
