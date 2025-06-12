import React from 'react';

const suggestions = ['Palm City', 'Zane', 'Beach', 'Sunset', 'Rainy Days', 'Adventure'];

const SearchSuggestions = () => {
  return (
    <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Search Suggestions</h3>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="text-sm text-gray-600 hover:text-black hover:font-medium cursor-pointer transition"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
