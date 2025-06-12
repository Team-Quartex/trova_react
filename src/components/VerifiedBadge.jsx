import { div } from 'framer-motion/client';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const VerifiedBadge = ({ size = '1rem', color = 'text-blue-500', title = 'Verified' }) => {
  return (
   <div>
    <FaCheckCircle
      className={`${color}`}
      style={{ fontSize: size }}
      title={title}
    />
    <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
    Tooltip content
    <div class="tooltip-arrow" data-popper-arrow></div>
</div>
    </div>
    
  );
};

export default VerifiedBadge;
