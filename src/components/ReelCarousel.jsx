import React, { useRef } from "react";
import ReelVideo from "./ReelVideo";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ReelCarousel = ({ reels }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll distance as needed
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative mb-6 no-scrollbar shadow m-[5px] p-[20px] rounded-[30px]">
      <div className="text-[20px] font-bold py-[10px]">Reels</div>
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1 shadow-md"
        aria-label="Scroll Left"
      >
        <FiChevronLeft className="text-xl text-gray-700" />
      </button>

      {/* Reel videos container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {reels.map((reel, index) => (
          <ReelVideo key={index} src={reel.src} caption={reel.caption} />
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1 shadow-md"
        aria-label="Scroll Right"
      >
        <FiChevronRight className="text-xl text-gray-700" />
      </button>
    </div>
  );
};

export default ReelCarousel;
