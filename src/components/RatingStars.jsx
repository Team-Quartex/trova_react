import React from 'react';
import { Star } from 'lucide-react';

export function RatingDisplay({ rating, reviewCount, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              index < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : index < rating
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className={`${textSizes[size]} font-semibold text-gray-800`}>
        {rating.toFixed(1)}
      </span>
      {reviewCount && (
        <span className={`${textSizes[size]} text-gray-500`}>
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
}

export function RatingInput({ rating, onRatingChange, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onRatingChange(index + 1)}
          className={`${sizeClasses[size]} transition-all duration-200 hover:scale-110`}
        >
          <Star
            className={`w-full h-full ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          />
        </button>
      ))}
    </div>
  );
}