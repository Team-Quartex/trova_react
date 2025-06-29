import React, { useState } from 'react';
import { MessageCircle, Plus, Send, User } from 'lucide-react';
import { RatingDisplay, RatingInput } from './RatingStars';

export default function Reviews({ reviews: initialReviews, onAddReview }) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!newReview.comment.trim() || !newReview.name.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      verified: Math.random() > 0.5
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', name: '' });
    setShowAddReview(false);
    
    if (onAddReview) {
      onAddReview(review);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-800">
            Reviews ({reviews.length})
          </h3>
        </div>
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-800 hover:to-gray-900 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          Add Review
        </button>
      </div>

      {/* Average Rating */}
      {reviews.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <RatingDisplay rating={averageRating} reviewCount={reviews.length} size="lg" />
            <p className="text-gray-600 mt-2">Based on {reviews.length} reviews</p>
          </div>
        </div>
      )}

      {/* Add Review Form */}
      {showAddReview && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-1 focus:border-[#248277] outline-none transition-all duration-200"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <RatingInput
                rating={newReview.rating}
                onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-1 focus:border-[#248277] outline-none transition-all duration-200 resize-none"
                placeholder="Share your experience..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#248277] hover:bg-[#248277]/90 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowAddReview(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                  <User className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h5 className="font-semibold text-gray-800">{review.name}</h5>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <RatingDisplay rating={review.rating} size="sm" />
                  
                  <p className="text-gray-700 mt-3 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}