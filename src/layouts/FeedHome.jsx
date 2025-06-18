import React, { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import ReelCarousel from "../components/ReelCarousel";

const FeedHome = () => {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([
    { src: "https://videos.pexels.com/video-files/1994828/1994828-hd_1920_1080_24fps.mp4", caption: "Reel Name" },
    { src: "https://videos.pexels.com/video-files/3018542/3018542-hd_1920_1080_24fps.mp4", caption: "Reel Name" },
    { src: "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4", caption: "Reel Name" },
    { src: "https://videos.pexels.com/video-files/2146396/2146396-uhd_2560_1440_30fps.mp4", caption: "Reel Name" },
    { src: "https://videos.pexels.com/video-files/2547258/2547258-uhd_2560_1440_30fps.mp4", caption: "Reel Name" },
    { src: "https://videos.pexels.com/video-files/2848072/2848072-uhd_2560_1440_30fps.mp4", caption: "Reel Name" },
  ]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/data.json");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    };

    fetchPost();
  }, []);

  return (
    <div className="h-full overflow-y-auto pb-8">
      <PostForm />

      <ReelCarousel reels={reels} />

      {posts.map((post) => (
        <Post
          key={post.id}
          userName={post.userName}
          userImage={post.userImage}
          images={post.images}
          date={post.date}
          description={post.description}
          isFollow={post.isFollow}
          isBookmark={post.isBookmark}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default FeedHome;
