import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const VerifiedBadge = ({ size = '1rem', color = 'text-blue-500', title = 'Verified' }) => {
  return (
    <FaCheckCircle
      className={`${color}`}
      style={{ fontSize: size }}
      title={title}
    />
  );
};

export default VerifiedBadge;
