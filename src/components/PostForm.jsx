import React, { useState, useRef } from "react";
import ImagePicker from "./ImagePicker";
import {
  FiSmile,
  FiGlobe,
  FiSend,
  FiChevronDown,
} from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import { FiImage } from "react-icons/fi";

const PostForm = () => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);

  const [hideCommentCount, setHideCommentCount] = useState(false);
  const [hideLikeCount, setHideLikeCount] = useState(false);
  const [visibility, setVisibility] = useState("Public");
  const [scheduledDate, setScheduledDate] = useState("");

  const textareaRef = useRef(null);

  const onEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = text.substring(0, start) + emoji + text.substring(end);
    setText(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    }, 0);
  };

  return (
    <div className="rounded-3xl p-4 mb-6 bg-[#ecf9ee] max-w-full">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Text area */}
        <div className="bg-white p-3 rounded-2xl flex items-start gap-3 mb-4 shadow-sm relative">
          <img
            src="/images/Dummy.png"
            alt="User"
            className="w-10 h-10 object-cover rounded-full"
          />
          <textarea
            ref={textareaRef}
            rows="6"
            cols="30"
            placeholder="What's your mind..."
            className="flex-grow resize-none border-none outline-none bg-transparent text-base placeholder:text-primary placeholder:font-light placeholder:text-2xl"
            style={{
              caretColor: "#52b788",
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="button"
            className="text-xl text-gray-500 hover:text-green-600 transition cursor-pointer mt-1.5"
            onClick={() => setShowEmojiPicker((v) => !v)}
          >
            <FiSmile />
          </button>

          {showEmojiPicker && (
  <div
    className="absolute top-full mt-2 right-12 z-50 shadow-lg rounded-md"
    style={{ width: 280 }}
  >
    <EmojiPicker
      onEmojiClick={onEmojiClick}
      searchDisabled={true}
      skinTonePickerDisabled={true}
      preload={true}
    />
  </div>
)}
        </div>

        <hr className="border-t border-gray-300 mb-4" />

        <div className="flex flex-wrap items-center gap-3">
          <ImagePicker />

          <input
            type="text"
            placeholder="Type a city name"
            className="px-3 py-1.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-green-500 transition bg-white min-w-[150px]"
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowVisibilityDropdown((v) => !v);
                setShowPrivacyDropdown(false);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-sm cursor-pointer hover:border-green-500 transition min-w-[90px]"
            >
              <FiGlobe className="text-gray-600" />
              <span>{visibility}</span>
              <FiChevronDown className="text-gray-600" />
            </button>

            {showVisibilityDropdown && (
              <ul className="absolute left-0 mt-1 w-full rounded-md bg-white border border-gray-300 shadow-lg text-sm z-40">
                {["Public", "Private", "Scheduled"].map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setVisibility(option);
                      setShowVisibilityDropdown(false);
                      if (option !== "Scheduled") setScheduledDate("");
                    }}
                    className={`cursor-pointer px-3 py-2 hover:bg-green-100 ${
                      visibility === option ? "bg-green-200 font-semibold" : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowPrivacyDropdown((v) => !v);
                setShowVisibilityDropdown(false);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-sm cursor-pointer hover:border-green-500 transition min-w-[150px]"
            >
              <span>Privacy Options</span>
              <FiChevronDown className="text-gray-600" />
            </button>

            {showPrivacyDropdown && (
              <div className="absolute left-0 mt-1 w-56 rounded-md bg-white border border-gray-300 shadow-lg text-sm p-3 z-40">
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideCommentCount}
                    onChange={() => setHideCommentCount((v) => !v)}
                  />
                  <span>Hide comment count</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideLikeCount}
                    onChange={() => setHideLikeCount((v) => !v)}
                  />
                  <span>Hide like count</span>
                </label>
              </div>
            )}
          </div>

          {visibility === "Scheduled" && (
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-green-500 transition bg-white min-w-[220px]"
            />
          )}

          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#1a8381] text-white text-sm hover:bg-green-700 transition ml-auto"
          >
            <FiSend className="text-base" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
