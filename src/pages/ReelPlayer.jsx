import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiX, FiSend, FiMessageCircle } from "react-icons/fi";

const ReelPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reelId = Number(id);

  // Sample comments - replace with real fetch logic
  const [comments, setComments] = useState([
    { user: "John", text: "Wow amazing!" },
    { user: "Anna", text: "🔥🔥🔥" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    // Reset comments or fetch new comments on reelId change
    setComments([
      { user: "John", text: `Welcome to reel ${reelId}` },
      { user: "Anna", text: "🔥🔥🔥" },
    ]);
    setNewComment("");
    setCommentsOpen(false);
  }, [reelId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, { user: "You", text: newComment.trim() }]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddComment();
  };

  const reelData = {
    id: reelId,
    src: `/reels/reel-${reelId}.mp4`,
    caption: `This is the caption for reel #${reelId}. Enjoy!`,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col md:flex-row z-50">
      {/* Close button top right corner on all screen sizes */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 z-50 bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg transition"
        aria-label="Close"
      >
        <FiX size={24} />
      </button>

      {/* Left side: Video + caption */}
      <div className="relative flex flex-col justify-center items-center bg-black md:w-2/3 w-full max-h-screen md:max-h-full md:overflow-hidden">
        <video
          src={reelData.src}
          controls
          autoPlay
          muted
          className="w-full max-h-[calc(100vh-80px)] md:max-h-full object-contain"
        />

        {/* Caption */}
        <div className="text-white text-center text-sm md:text-base p-3 border-t border-gray-700 w-full max-w-4xl">
          {reelData.caption}
        </div>

        {/* On mobile show comment toggle button, positioned above input */}
        {!commentsOpen && (
          <button
            onClick={() => setCommentsOpen(true)}
            className="md:hidden fixed bottom-20 right-4 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg flex items-center gap-2"
            aria-label="Open comments"
          >
            <FiMessageCircle size={20} />
            Comments
          </button>
        )}
      </div>

      {/* Right side: Comments panel */}
      <div
        className={`fixed md:relative top-0 right-0 bg-white w-full md:w-1/3 h-full md:h-auto flex flex-col shadow-xl transition-transform duration-300 ease-in-out ${
          commentsOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
        style={{ maxHeight: "100vh" }}
      >
        <div className="flex flex-col flex-grow overflow-hidden">
          <h3 className="font-bold text-gray-900 p-4 border-b border-gray-300 text-xl">
            Comments
          </h3>

          {/* Comments list */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {comments.length === 0 && (
              <p className="text-gray-500 italic text-center">No comments yet</p>
            )}
            {comments.map((c, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-md p-2 shadow-sm flex items-center gap-3"
              >
                <div className="font-semibold text-gray-800">{c.user}:</div>
                <div className="text-gray-700 break-words">{c.text}</div>
              </div>
            ))}
          </div>

          {/* Add comment input */}
          <div className="border-t border-gray-300 p-4 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddComment}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 shadow"
              aria-label="Post Comment"
            >
              <FiSend size={20} />
              Post
            </button>
          </div>
        </div>

        {/* Close comments button on mobile, only if commentsOpen */}
        {commentsOpen && (
          <button
            onClick={() => setCommentsOpen(false)}
            className="md:hidden absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg transition z-50"
            aria-label="Close comments"
          >
            <FiX size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReelPlayer;
