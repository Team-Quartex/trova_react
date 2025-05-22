import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeedMessage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chatList = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return (
    <div className="flex w-full h-full">
      {/* Left panel - Chat list */}
      <div className="w-1/3 h-full bg-red-300 p-3 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Chats</h2>
        {chatList.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-3 mb-2 bg-white rounded-lg cursor-pointer hover:bg-red-100 transition-all ${
              selectedChat?.id === chat.id ? "bg-red-200" : ""
            }`}
          >
            {chat.name}
          </div>
        ))}
      </div>

      {/* Right panel - Chat details */}
      <div className="w-2/3 h-full relative bg-amber-400 overflow-hidden">
        {selectedChat ? (
          <motion.div
            key={selectedChat.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full bg-white p-4"
          >
            <h2 className="text-xl font-semibold mb-2">
              Chat with {selectedChat.name}
            </h2>
            <div className="h-[80%] bg-gray-100 p-3 rounded overflow-y-auto">
              {/* Chat messages can go here */}
              <p className="text-gray-500">Start chatting with {selectedChat.name}...</p>
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-600 font-medium">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedMessage;
