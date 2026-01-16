"use client";

import { useState, useEffect } from "react";

const WeekDatePicker = ({ onSelect }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatValue = (date) =>
    date.toISOString().split("T")[0];

  useEffect(() => {
    onSelect?.(formatValue(selectedDate));
  }, [selectedDate]);

  // ---------- DESKTOP WEEK LOGIC ----------
  const getWeekStart = (offset) => {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;
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

  return (
    <div className="space-y-4">
      {/* ===== MOBILE DATE PICKER ===== */}
      <div className="md:hidden">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select date
        </label>
        <input
          type="date"
          value={formatValue(selectedDate)}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* ===== DESKTOP WEEK PICKER ===== */}
      <div className="hidden md:block space-y-3">
        {/* Week navigation */}
        <div className="grid grid-cols-3 items-center text-sm">
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
        <div className="flex gap-2">
          {days.map((date) => {
            const isSelected =
              formatValue(date) === formatValue(selectedDate);

            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-3 rounded-lg text-sm font-medium
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                {formatLabel(date)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekDatePicker;
