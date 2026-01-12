"use client";

import { useState } from "react";
import EmptyState from "./EmptyState";

const BookingTabs = ({
  upcomingBookings = [],
  pastBookings = [],
  renderBooking,
}) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 text-sm font-medium transition
              ${
                activeTab === "upcoming"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            Upcoming
            {upcomingBookings.length > 0 && (
              <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
                {upcomingBookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("past")}
            className={`pb-3 text-sm font-medium transition
              ${
                activeTab === "past"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            Past
            {pastBookings.length > 0 && (
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {pastBookings.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="space-y-4">
        {activeTab === "upcoming" &&
          (upcomingBookings.length > 0 ? (
            upcomingBookings.map(renderBooking)
          ) : (
            <EmptyState
              title="No upcoming bookings"
              description="You don’t have any classes booked yet."
            />
          ))}

        {activeTab === "past" &&
          (pastBookings.length > 0 ? (
            pastBookings.map(renderBooking)
          ) : (
            <EmptyState
              title="No past bookings"
              description="Your completed classes will appear here."
            />
          ))}
      </div>
    </div>
  );
};

export default BookingTabs;

