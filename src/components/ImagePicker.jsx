import React from "react";
import { FiImage } from "react-icons/fi";

const ImagePicker = () => {
  return (
    <div className="flex items-center">
      <input
        type="file"
        accept="image/*,video/*"
        id="image-picker"
        className="hidden"
        multiple
      />
      <label
        htmlFor="image-picker"
        className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-sm hover:border-green-500 transition"
      >
        <FiImage className="text-gray-600" />
        <span>Image/Video</span>
      </label>
    </div>
  );
};

export default ImagePicker;
