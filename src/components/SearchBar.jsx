import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onChange }) => {
  return (
    <div className="w-full relative py-2">
      <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="search"
        placeholder="Search Hotels"
        onChange={onChange}
        className="shadow w-full h-[5vh] rounded-xl pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] transition placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
