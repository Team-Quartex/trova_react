import React, { useState, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi"; // Import back icon
import Post from "../components/Post";

const mockUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  avatar: "https://i.pravatar.cc/150?img=12",
  banner:
    "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=3628&auto=format&fit=crop",
  followers: 1200,
  following: 180,
  posts: 34,
  bio: "Adventurer | Photographer | Dreamer. Exploring the world and capturing moments.",
};

const mockPosts = [
  {
    id: 101,
    author: mockUser,
    content: "Loving this new view 🌄",
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    timestamp: "2h ago",
    likes: 45,
    comments: 12,
  },
  {
    id: 102,
    author: mockUser,
    content: "A day at the beach 🏖️",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    timestamp: "1d ago",
    likes: 78,
    comments: 25,
  },
];

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const bannerRef = useRef(null);

  const handleFollow = () => setIsFollowing(!isFollowing);

  useEffect(() => {
    const onScroll = () => {
      if (!bannerRef.current) return;
      const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
      setShowStickyHeader(bannerBottom < 70);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Back button handler
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Sticky header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-md transition-transform duration-300 ${
          showStickyHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Back button */}
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#478c66] rounded-full p-1 mr-3"
            >
              <FiArrowLeft size={24} />
            </button>

            <img
              src={mockUser.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
            />
            <div className="truncate max-w-xs">
              <h2 className="font-semibold text-lg text-gray-900 truncate leading-tight">
                {mockUser.name}
              </h2>
              <p className="text-sm text-gray-600 truncate">@{mockUser.username}</p>
            </div>
          </div>
          <button
            onClick={handleFollow}
            className={`px-5 py-2 rounded-full font-semibold shadow-md transition-colors duration-300 focus:outline-none whitespace-nowrap ${
              isFollowing
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-[#478c66] text-white hover:bg-[#53a176]"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </header>

      {/* Banner */}
      <section
        ref={bannerRef}
        className="relative w-full h-72 sm:h-96 lg:h-[28rem] overflow-hidden shadow-inner rounded-b-3xl"
      >
        <img
          src={mockUser.banner}
          alt="Banner"
          className="w-full h-full object-cover filter brightness-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-8 flex items-center gap-6">
          <img
            src={mockUser.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
            loading="lazy"
          />
          <div className="text-white drop-shadow-lg">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              {mockUser.name}
            </h1>
            <p className="mt-1 text-lg font-medium opacity-90">@{mockUser.username}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 mt-20 sm:mt-24 space-y-8">
        {/* Stats + Follow */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
          <div className="flex justify-center sm:justify-start gap-10 text-center text-gray-700 font-semibold tracking-wide">
            <div>
              <p className="text-2xl sm:text-3xl">{mockUser.followers.toLocaleString()}</p>
              <p className="text-sm font-normal text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl">{mockUser.following.toLocaleString()}</p>
              <p className="text-sm font-normal text-gray-500">Following</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl">{mockUser.posts.toLocaleString()}</p>
              <p className="text-sm font-normal text-gray-500">Posts</p>
            </div>
          </div>

          {/* Follow Button (hidden if sticky header is visible) */}
          {!showStickyHeader && (
            <button
              onClick={handleFollow}
              className={`self-center sm:self-center px-8 py-3 rounded-full font-semibold shadow-lg transition-colors duration-300 whitespace-nowrap ${
                isFollowing
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-[#478c66] text-white hover:bg-[#53a176]"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </section>

        {/* Bio */}
        {mockUser.bio && (
          <section className="max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed px-4 sm:px-0">
            {mockUser.bio}
          </section>
        )}

        {/* Latest Posts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Latest Posts</h2>
          <div className="grid grid-cols-1 gap-3">
            {mockPosts.map((post) => (
              <article
                key={post.id}
                
              >
                <Post
                  userName={post.author.name}
                  userImage={post.author.avatar}
                  images={[post.image]}
                  date={post.timestamp}
                  description={post.content}
                  likes={post.likes}
                  comments={post.comments}
                />
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
