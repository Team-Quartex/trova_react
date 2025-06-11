import React, { useState } from 'react';
import ProfileNav from '../components/ProfileNav';
import RightLayout from '../layouts/RightLayout';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationPanel from '../components/NotificationPanel';
import { FiSettings, FiMail, FiBell, FiSearch, FiMenu, FiX } from 'react-icons/fi';

const Home = () => {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleNotification = () => setShowNotification(!showNotification);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

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
      {/* Sidebar (mobile: hidden, desktop: visible) */}
      <div
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transition-transform transform
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:w-[20vw] lg:block
        `}
      >
        <div className="lg:hidden p-3 flex justify-end">
          <button onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div>
        <ProfileNav />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Section */}
      <div className="flex-1 w-full lg:w-[60vw] h-full px-4 pt-3 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-gray-200">
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold">{getPageTitle()}</h1>
          </div>

          <div className="flex gap-2 items-center text-gray-700">
            <Link to="/setting" className="p-2 rounded-full hover:bg-gray-200 transition">
              <FiSettings size={20} />
            </Link>
            <Link to="/message" className="p-2 rounded-full hover:bg-gray-200 transition">
              <FiMail size={20} />
            </Link>
            <div className="relative">
              <button onClick={toggleNotification} className="p-2 rounded-full hover:bg-gray-200 transition">
                <FiBell size={20} />
              </button>
              {showNotification && <NotificationPanel onClick={toggleNotification} />}
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
      </div>

      {/* Right Sidebar: Only for lg+ */}
      <div className="hidden lg:block w-[20vw] h-full border-l border-gray-200">
        <RightLayout />
      </div>
    </div>
  );
};

export default Home;
