"use client";

import { useState, useEffect } from "react";

const WeekDatePicker = ({ onSelect }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get Monday of the week for a given offset
  const getWeekStart = (offset) => {
    const today = new Date();
    const day = today.getDay(); // 0 = Sun, 1 = Mon
    const diff = day === 0 ? -6 : 1 - day; // make Monday start
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff + offset * 7);
    return monday;
  };

  const weekStart = getWeekStart(weekOffset);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const formatLabel = (date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const formatValue = (date) =>
    date.toISOString().split("T")[0];

  // Notify parent when selected date changes
  useEffect(() => {
    onSelect?.(formatValue(selectedDate));
  }, [selectedDate]);

  return (
    <div className="space-y-3">
      {/* Week navigation */}
      <div className="grid grid-cols-3 items-center gap-4 text-sm">
        {/* LEFT SLOT */}
        <div className="justify-self-start">
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="text-gray-600 hover:text-gray-900"
            >
              Previous week
            </button>
          )}
        </div>
        
        {/* CENTER SLOT (ALWAYS CENTERED) */}
        <div className="justify-self-center">
          <button
            onClick={() => {
              setWeekOffset(0);
              setSelectedDate(new Date());
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            This week
          </button>
        </div>

        {/* RIGHT SLOT */}
        <div className="justify-self-end">
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="text-gray-600 hover:text-gray-900"
          >
            Next week
          </button>
        </div>
      </div>

      {/* Days */}
      <div className="flex gap-2 overflow-x-auto">
        {days.map((date) => {
          const isSelected =
            formatValue(date) === formatValue(selectedDate);

          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`mr-2 w-40 text center px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap
                ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
            >
              {formatLabel(date)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekDatePicker;
