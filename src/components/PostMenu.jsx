import React, { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal, FiEyeOff, FiFlag, FiBookmark } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const PostMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action) => {
    console.log(`${action} clicked`);
    setMenuOpen(false);
  };

  const menuItems = [
    {
      label: 'Hide Post',
      icon: <FiEyeOff className="text-gray-600" />,
      action: () => handleAction("Hide Post")
    },
    {
      label: 'Report User',
      icon: <FiFlag className="text-gray-600" />,
      action: () => handleAction("Report User")
    },
    {
      label: 'Save Post',
      icon: <FiBookmark className="text-gray-600" />,
      action: () => handleAction("Save Post")
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="mt-2 sm:mt-0 p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Post Menu"
      >
        <FiMoreHorizontal size={20} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostMenu;
