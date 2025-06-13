'use client';
import React, { useState } from 'react';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import Post from '../components/Post';
import SearchSuggestions from '../components/SearchSuggestions';

const dummyPosts = [
  {
    userName: 'Zane Perera',
    userImage: 'https://i.pravatar.cc/150?img=3',
    images: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683141023289-49fdc6fa7506?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    date: 'June 12, 2025',
    description: 'Exploring Palm City! 🌴',
    likes: 24,
    comments: 6,
  },
  {
    userName: 'Nova Allen',
    userImage: 'https://i.pravatar.cc/150?img=5',
    images: ['https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=3628&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    date: 'June 11, 2025',
    description: 'This sunset was unreal. 🌅',
    likes: 45,
    comments: 8,
  },
];

const SearchLayout = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <>
   

      <div className="w-full min-h-screen bg-[#f9fafb] px-4 py-6">
        
        {/* Search Bar */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="search"
            className="w-full pl-12 pr-4 py-3 rounded-2xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#22a461] bg-white text-sm sm:text-base"
            placeholder="Search here..."
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && <SearchSuggestions />}
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {dummyPosts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchLayout;
