import React from "react";
import { FiPlus } from "react-icons/fi";

const CreateReelButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-4 z-50 bg-[#52b788] hover:bg-[#40916c] text-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2 transition"
      aria-label="Create Reel"
    >
      <FiPlus size={24} />
      <span className="font-semibold">Create Reel</span>
    </button>
  );
};

export default CreateReelButton;
