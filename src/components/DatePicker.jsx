import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function DatePicker({ onDateChange, startDate, endDate }) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleStartDateChange = (e) => {
    const newStartDate = new Date(e.target.value);
    onDateChange({ startDate: newStartDate, endDate });
    setShowStartPicker(false);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.target.value);
    onDateChange({ startDate, endDate: newEndDate });
    setShowEndPicker(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const minEndDate = startDate ? startDate.toISOString().split('T')[0] : today;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-[#469d89]" />
        Select Rental Dates
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={today}
              onChange={handleStartDateChange}
              className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#469d89] transition-all duration-200"
            />
            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          {startDate && (
            <p className="mt-2 text-sm text-[#469d89] font-medium">
              {formatDate(startDate)}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={minEndDate}
              onChange={handleEndDateChange}
              className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-[#469d89] transition-all duration-200"
            />
            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          {endDate && (
            <p className="mt-2 text-sm text-[#469d89] font-medium">
              {formatDate(endDate)}
            </p>
          )}
        </div>
      </div>

      {/* Duration Display */}
      {startDate && endDate && (
        <div className="bg-gradient-to-r from-[#99e2b4]/20 to-orange-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Rental Duration:</span>
            <span className="font-semibold text-gray-800">
              {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days
            </span>
          </div>
        </div>
      )}
    </div>
  );
}