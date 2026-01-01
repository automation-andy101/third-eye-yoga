"use client";

import { useState } from "react";

const WeekDatePicker = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatLabel = (date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const formatValue = (date) =>
    date.toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <div className="flex gap-2 overflow-x-auto">
      {days.map((date) => {
        const isSelected =
          formatValue(date) === formatValue(selectedDate);

        return (
          <button
            key={date.toISOString()}
            onClick={() => {
              setSelectedDate(date);
              onSelect(formatValue(date));
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
          >
            {formatLabel(date)}
          </button>
        );
      })}
    </div>
  );
};

export default WeekDatePicker;
