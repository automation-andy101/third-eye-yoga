"use client";

import Link from "next/link";

const BookingTabs = ({ activeTab }) => {
  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex gap-6">
        <Link
          href="/bookings?tab=upcoming"
          className={`pb-3 text-sm font-medium transition
            ${
              activeTab === "upcoming"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Upcoming
        </Link>

        <Link
          href="/bookings?tab=past"
          className={`pb-3 text-sm font-medium transition
            ${
              activeTab === "past"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Past
        </Link>
      </nav>
    </div>
  );
};

export default BookingTabs;
