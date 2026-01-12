"use client";

import Link from "next/link";

const BookingCard = ({ booking, onCancel }) => {
  const yogaClass = booking.class;

  // Safety: class may have been deleted
  if (!yogaClass) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-700">
          This class is no longer available
        </p>
        <p className="text-sm text-red-600">
          Your booking remains for record purposes.
        </p>
      </div>
    );
  }

  const startDate = new Date(yogaClass.start_at);
  const isPast = startDate < new Date();
  const isCancelled = booking.status === "cancelled";

  const formattedDate = startDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const formattedTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm transition
        ${isCancelled ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"}
      `}
    >
      <div className="flex justify-between items-start gap-4">
        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {yogaClass.title}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            🗓 {formattedDate}
          </p>

          <p className="text-sm text-gray-600">
            🕒 {formattedTime}
          </p>

          {yogaClass.teacher?.name && (
            <p className="mt-1 text-sm text-gray-500">
              with {yogaClass.teacher.name}
            </p>
          )}
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-2">
          {/* Status badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium
              ${
                isCancelled
                  ? "bg-gray-200 text-gray-700"
                  : isPast
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-100 text-green-700"
              }
            `}
          >
            {isCancelled
              ? "Cancelled"
              : isPast
              ? "Completed"
              : "Upcoming"}
          </span>

          {/* Actions */}
          {!isPast && !isCancelled && (
            <button
              onClick={() => onCancel?.(booking.$id)}
              className="text-sm text-red-600 hover:underline"
            >
              Cancel booking
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      {booking.students_email && (
        <p className="mt-4 text-xs text-gray-400">
          Booked as {booking.students_email}
        </p>
      )}
    </div>
  );
};

export default BookingCard;
