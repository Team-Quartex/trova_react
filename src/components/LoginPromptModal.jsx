// src/components/LoginPromptModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPromptModal = ({ isOpen, onClose, onLogin }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#000000c3] bg-opacity-60 flex items-center justify-center backdrop-blur-[5px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-2">Sign in to continue</h2>
            <p className="text-sm text-gray-600 mb-4">
              You’ve been scrolling for a while. To interact or personalize your feed, please log in.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Maybe later
              </button>
              <button
                onClick={onLogin}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[#478c66] transition"
              >
                Log In
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPromptModal;
