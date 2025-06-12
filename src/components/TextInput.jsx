import React, { useState } from 'react';

const TextInput = ({ type, placeholder, icon, toggleable = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        type={toggleable ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        className="w-full py-3 pl-4 pr-12 text-sm border border-gray-300 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1A8381] transition-all"
        required
      />
      <i
        className={`${icon} absolute right-4 top-1/2 transform -translate-y-1/2 text-[#1A8381] text-lg cursor-pointer`}
        onClick={toggleable ? toggleVisibility : undefined}
      ></i>
    </div>
  );
};

export default TextInput;
