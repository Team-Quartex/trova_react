import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search } from 'lucide-react';

export default function AvailabilityChecker({ startDate, endDate, onAvailabilityCheck }) {
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState(null);

  const checkAvailability = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      const isAvailable = Math.random() > 0.3; // 70% chance of being available
      setAvailability(isAvailable);
      setIsChecking(false);
      if (onAvailabilityCheck) {
        onAvailabilityCheck(isAvailable);
      }
    }, 1500);
  };

  const getAvailabilityStatus = () => {
    if (availability === null) return null;
    
    return availability ? {
      icon: CheckCircle,
      text: 'Available for selected dates',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      iconColor: 'text-green-500'
    } : {
      icon: XCircle,
      text: 'Not available for selected dates',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      iconColor: 'text-red-500'
    };
  };

  const status = getAvailabilityStatus();

  return (
    <div className="space-y-4">
      {/* Check Availability Button */}
      <button
        onClick={checkAvailability}
        disabled={!startDate || !endDate || isChecking}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#248277] to-[#248277] hover:from-[#358f80] hover:to-[#469d89] disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:transform-none"
      >
        {isChecking ? (
          <>
            <Clock className="h-5 w-5 animate-spin" />
            Checking Availability...
          </>
        ) : (
          <>
            <Search className="h-5 w-5" />
            Check Availability
          </>
        )}
      </button>

      {/* Availability Status */}
      {status && (
        <div className={`${status.bgColor} border border-opacity-20 rounded-xl p-4 transition-all duration-300 animate-fadeIn`}>
          <div className="flex items-center gap-3">
            <status.icon className={`h-6 w-6 ${status.iconColor}`} />
            <span className={`font-medium ${status.textColor}`}>
              {status.text}
            </span>
          </div>
          
          {availability && (
            <div className="mt-3 pt-3 border-t border-green-200">
              <p className="text-sm text-green-700">
                Great! This item is available for your selected dates. You can proceed with the booking.
              </p>
            </div>
          )}
          
          {availability === false && (
            <div className="mt-3 pt-3 border-t border-red-200">
              <p className="text-sm text-red-700">
                This item is already booked for some or all of your selected dates. Please try different dates.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}