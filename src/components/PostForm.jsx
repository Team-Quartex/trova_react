import React from "react";
import ImagePicker from "./ImagePicker";
import { FiSmile, FiGlobe, FiSend } from "react-icons/fi";

const PostForm = () => {
  return (
    <div className="rounded-3xl p-4 mb-6 bg-[#ecf9ee]">
      <form>
        {/* Text area and icons */}
        <div className="bg-white p-3 rounded-2xl flex items-start gap-3 mb-4 shadow-sm">
          <img
            src="/images/Dummy.png"
            alt="User"
            className="w-10 h-10 object-cover rounded-full"
          />
          <textarea
            rows="6"
            cols="30"
            placeholder="What's your mind..."
            className="flex-grow resize-none border-none outline-none bg-transparent text-base placeholder:text-primary placeholder:font-light placeholder:text-2xl"
          />
          <FiSmile className="text-xl text-gray-500 hover:text-green-600 transition cursor-pointer mt-1.5" />
        </div>

        <hr className="border-t border-gray-300 mb-4" />

        {/* Bottom controls */}
        <div className="flex flex-wrap justify-between items-center gap-3 px-1">
          <ImagePicker />

          <input
            type="text"
            id="city-search"
            placeholder="Type a city name"
            autoComplete="off"
            className="px-3 py-1.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-green-500 transition bg-white"
          />

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-sm cursor-pointer hover:border-green-500 transition">
            <FiGlobe className="text-gray-600" />
            <span>Public</span>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#1a8381] text-white text-sm hover:bg-green-700 transition"
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
