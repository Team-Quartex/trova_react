import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ReelVideo = ({ src, caption, id }) => {
  const videoRef = useRef();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const handleClick = () => {
    navigate(`/reel/${id}`);
  };

  return (
    <div
      className="min-w-[200px] sm:min-w-[350px] md:min-w-[250px] h-100 bg-black rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        className="w-full h-full object-cover"
        playsInline
      />
     
    </div>
  );
};

export default ReelVideo;
