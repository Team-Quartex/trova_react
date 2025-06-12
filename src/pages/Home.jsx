// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProfileNav from '../components/ProfileNav';
import RightLayout from '../layouts/RightLayout';
import NotificationPanel from '../components/NotificationPanel';
import EndScreen from '../components/EndScreen';
import LoginPromptModal from '../components/LoginPromptModal';
import { FiSettings, FiMail, FiBell, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginModal(true);
      document.body.style.overflow = 'hidden'; // Prevent scroll behind modal
    }, 10000); // Show modal after 35 seconds

    return () => clearTimeout(timer);
  }, []);

  const closeLoginModal = () => {
    setShowLoginModal(false);
    document.body.style.overflow = 'auto';
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'Feed';
    if (path === '/message') return 'Messages';
    if (path === '/friends') return 'Friends';
    if (path === '/notifications') return 'Notifications';
    if (path === '/search') return 'Search';
    if (path === '/hotels') return 'Hotels';
    if (path === '/dayouts') return 'Dayouts';
    return 'Page';
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transition-transform transform
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:w-[20vw] lg:block
        `}
      >
        <div className="lg:hidden p-3 flex justify-end">
          <button onClick={() => setShowSidebar(false)}>
            <FiX size={24} />
          </button>
        </div>
        <ProfileNav />
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Section */}
      <div className="flex-1 w-full lg:w-[60vw] h-full px-4 pt-3 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden p-2 rounded-md hover:bg-gray-200">
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold">{getPageTitle()}</h1>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Link to="/setting" className="p-2 rounded-full hover:bg-gray-200">
              <FiSettings size={20} />
            </Link>
            <Link to="/message" className="p-2 rounded-full hover:bg-gray-200">
              <FiMail size={20} />
            </Link>
            <div className="relative">
              <button onClick={() => setShowNotification(!showNotification)} className="p-2 rounded-full hover:bg-gray-200">
                <FiBell size={20} />
              </button>
              {showNotification && <NotificationPanel onClick={() => setShowNotification(false)} />}
            </div>
            {getPageTitle() !== 'Search' && (
              <Link to="/search" className="bg-primary p-2 rounded-full hover:bg-primary-dark transition">
                <FiSearch size={20} color="white" />
              </Link>
            )}
          </div>
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full overflow-y-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        <EndScreen />
      </div>

      {/* Right Layout */}
      <div className="hidden lg:block w-[20vw] h-full border-l border-gray-200">
        <RightLayout />
      </div>

      {/* Login Modal Overlay */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onLogin={() => {
          closeLoginModal();
          navigate('/login');
        }}
      />
    </div>
  );
};

export default Home;
