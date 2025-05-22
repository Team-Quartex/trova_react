import React, { useEffect, useState,useCallback  } from "react";
import { useParams ,useNavigate, data } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ShowPost = () => {
  const postData = [
  {
    id: 1,
    userName: "Sphoie",
    userImage: "/images/profile.png",
    images: ["/images/sgiriya.jpg"],
    date: "November 25",
    description: "hello world",
    isFollow: false,
    isBookmark: false,
    likes: 50,
    comments: 0
  },
  {
    id: 2,
    userName: "Sphoie",
    userImage: "/images/profile.png",
    images: ["/images/banner.jpeg","/images/sgiriya.jpg"],
    date: "November 25",
    description: "hello world",
    isFollow: false,
    isBookmark: false,
    likes: 60,
    comments: 2
  },
  {
    id: 3,
    userName: "Sphoie",
    userImage: "/images/profile.png",
    images: Array(3).fill("/images/sgiriya.jpg"),
    date: "November 25",
    description: "hello world",
    isFollow: false,
    isBookmark: false,
    likes: 70,
    comments: 3
  },
  {
    id: 4,
    userName: "Sphoie",
    userImage: "/images/profile.png",
    images: Array(4).fill("/images/sgiriya.jpg"),
    date: "November 25",
    description: "hello world",
    isFollow: false,
    isBookmark: false,
    likes: 80,
    comments: 5
  },
  {
    id: 5,
    userName: "Sphoie",
    userImage: "/images/profile.png",
    images: Array(5).fill("/images/sgiriya.jpg"),
    date: "November 25",
    description: "hello world",
    isFollow: false,
    isBookmark: false,
    likes: 90,
    comments: 8
  }
];
  const postid = Number(useParams().postId);
  const navigate = useNavigate();
  const [post, setPostData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch post
  useEffect(() => {
    const fetchData = ()=>{
      const foundPost = postData.find((p) => p.id === 2);
    if (foundPost) {
      setPostData(foundPost);
    }
    }
    fetchData();
  }, [postid]);
  console.log(post);
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!post) return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % post.images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
      } else if (e.key === "Escape") {
        navigate(-1); // Close
      }
    },
    [post, navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const closeModal = () => {
    navigate(-1); // Go back
  };


  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
      <div className="relative w-[90vw] h-[90vh] bg-white rounded-2xl p-1.5 grid grid-cols-[repeat(24,_minmax(0,_1fr))] grid-rows-[repeat(24,_minmax(0,_1fr))] gap-1 overflow-hidden">
        
        {/* ❌ Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg z-50"
        >
          ×
        </button>

        {/* user details */}
        <div className="col-span-17 row-span-3 bg-amber-200 flex">
          <img src={post.userImage} alt="" className="px-1 w-[5vw] " />
          <h1>{post.userName}</h1>
        </div>

        {/* post images */}
        <div className="col-start-18 col-span-8 row-span-24 bg-amber-300">
          
        </div>

        {/* comment and details */}
        {/* 🔍 Image with Zoom + Arrow Controls */}
        <div className="col-span-17 row-start-4 row-span-[22] relative overflow-hidden bg-black flex items-center justify-center">
          
          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length)
            }
            className="absolute left-2 z-20 px-3 py-2 bg-primary rounded-full"
          >
            <i className="fa-solid fa-arrow-left text-white"></i>
          </button>

          {/* Image with fade animation & zoom */}
          <AnimatePresence mode="wait">
            <motion.img
              key={post.images[currentIndex]}
              src={post.images[currentIndex]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              alt="Post"
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </AnimatePresence>

          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % post.images.length)
            }
            className="absolute right-2 z-20 px-3 py-2 bg-primary rounded-full"
          >
            <i className="fa-solid fa-arrow-right text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
