import React from "react";
import { FiX } from "react-icons/fi";
import ReelCommentInput from "./ReelCommentInput";

const ReelCommentPanel = ({
  comments,
  setCommentsOpen,
  commentText,
  setCommentText,
  onEmojiClick,
  showEmojiPicker,
  setShowEmojiPicker,
  attachedFiles,
  handleFileChange,
  removeFile,
  handleCommentSubmit,
  fileInputRef
}) => {
  return (
    <div className="flex flex-col h-full">
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
     <ReelCommentInput
  commentText={commentText}
  setCommentText={setCommentText}
  userName="You"
  setShowEmojiPicker={setShowEmojiPicker}
  showEmojiPicker={showEmojiPicker}
  onEmojiClick={onEmojiClick}
  fileInputRef={fileInputRef}
  imageInputRef={imageInputRef}
  handleFileChange={handleFileChange}
  attachedFiles={attachedFiles}
  removeFile={removeFile}
  handleCommentSubmit={handleCommentSubmit}
  setInputFocused={setInputFocused}
/>
    </div>
  );
};

export default ReelCommentPanel;
