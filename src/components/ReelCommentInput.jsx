import React from "react";
import { FaSmile, FaPaperclip, FaTimesCircle } from "react-icons/fa";
import { FiImage, FiSend } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";

const ReelCommentInput = ({
  commentText,
  setCommentText,
  userName,
  setShowEmojiPicker,
  showEmojiPicker,
  onEmojiClick,
  fileInputRef,
  imageInputRef,
  handleFileChange,
  attachedFiles,
  removeFile,
  handleCommentSubmit,
  setInputFocused
}) => (
  <div className="mt-2 p-2 border-t">
    <div className="flex items-center gap-2 relative border border-gray-300 rounded-full p-1">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder={`Comment as ${userName}`}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setTimeout(() => setInputFocused(false), 200)}
        className="flex-grow px-4 py-2 outline-none"
      />
      <button
        type="button"
        onClick={() => setShowEmojiPicker(val => !val)}
        className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
      >
        <FaSmile size={18} />
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
      >
        <FaPaperclip size={18} />
      </button>
      <button
        type="button"
        onClick={() => imageInputRef.current.click()}
        className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
      >
        <FiImage size={18} />
      </button>
      <button
        onClick={handleCommentSubmit}
        disabled={!commentText.trim() && attachedFiles.length === 0}
        className={`p-2 rounded-full ${
          commentText.trim() || attachedFiles.length > 0
            ? 'bg-[#52b788] hover:bg-[#40916c]'
            : 'bg-gray-300 cursor-not-allowed'
        } text-white transition`}
      >
        <FiSend size={18} />
      </button>

    {showEmojiPicker && (
    <div
      className="absolute bottom-full left-0 mb-1 z-50"
      style={{ width: '100%' }}
    >
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        preload={true}
        searchDisabled={true}
        skinTonePickerDisabled={true}
      />
    </div>
  )}
    </div>

    <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
    <input ref={imageInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />

    {attachedFiles.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        {attachedFiles.map((file, index) => {
          const url = URL.createObjectURL(file);
          const isImage = file.type.startsWith('image/');
          return (
            <div key={index} className="relative w-16 h-16 border rounded overflow-hidden">
              {isImage ? (
                <img src={url} alt={file.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-xs">
                  {file.name}
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-0 right-0 text-red-500 bg-white rounded-full hover:text-red-700"
              >
                <FaTimesCircle size={14} />
              </button>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default ReelCommentInput;
