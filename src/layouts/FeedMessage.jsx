import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const FeedMessage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const chatList = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=47" },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=52" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=36" },
  ];

  const handleSend = () => {
    if (!message.trim() || !selectedChat) return;

    const newMsg = { text: message, from: "You", time: new Date().toLocaleTimeString() };
    const updated = {
      ...chatMessages,
      [selectedChat.id]: [...(chatMessages[selectedChat.id] || []), newMsg],
    };
    setChatMessages(updated);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-svh w-full bg-gray-100 overflow-hidden">
      {/* Left panel - Chat list */}
      <div className="w-1/3 h-full bg-white border-r-[0.5px] shadow-md overflow-y-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chats</h2>
        {chatList.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
              selectedChat?.id === chat.id ? 'bg-green-100' : 'hover:bg-gray-100'
            }`}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-lg font-medium text-gray-800">{chat.name}</span>
          </div>
        ))}
      </div>

      {/* Right panel - Chat screen */}
      <div className="w-2/3 h-full relative flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 p-4 bg-white border-b shadow-sm">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-semibold text-gray-800">{selectedChat.name}</h2>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
              <AnimatePresence>
                {(chatMessages[selectedChat.id] || []).map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      msg.from === 'You' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`inline-block break-words px-4 py-2 rounded-xl shadow text-sm whitespace-pre-line max-w-[75%] ${
                        msg.from === 'You'
                          ? 'bg-green-200 text-right text-gray-800'
                          : 'bg-white text-left text-gray-900'
                      }`}
                    >
                      {msg.text}
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {msg.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input area */}
            <div className="flex items-center gap-2 p-4 bg-white border-t shadow-sm">
              <textarea
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-[50px] border border-gray-300 resize-none outline-none focus:ring-1 focus:ring-green-300"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-600 font-medium text-xl">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedMessage;
