// src/components/ReelNavButtons.jsx
import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ReelNavButtons = ({ onPrev, onNext }) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        zIndex: 50,
      }}
      aria-label="Reel navigation buttons"
    >
      <button
        onClick={onPrev}
        className="bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition"
        aria-label="Previous Reel"
      >
        <FaArrowUp size={20} />
      </button>
      <button
        onClick={onNext}
        className="bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition"
        aria-label="Next Reel"
      >
        <FaArrowDown size={20} />
      </button>
    </div>
  );
};

export default ReelNavButtons;
