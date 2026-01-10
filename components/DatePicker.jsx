"use client";

import { useState, useEffect } from "react";

const DatePicker = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Default to today
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  return (
    <div className="mt-4 mb-8">
      <label
        htmlFor="date"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Select date
      </label>

      <input
        type="date"
        id="date"
        value={selectedDate}
        className="w-60 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
        onChange={(e) => {
          setSelectedDate(e.target.value);
          if (onSelect) onSelect(e.target.value); // only call on user change
        }}
      />
    </div>
  );
};

export default DatePicker;
