import getMyBookings from "@/app/actions/getMyBookings";
import BookingCard from "/components/BookingCard";
import Heading from "/components/Heading";
import BookingTabs from "/components/BookingTabs";
import EmptyState from "/components/EmptyState";

export default async function MyBookingsPage({ searchParams }) {
  const tab = searchParams?.tab || "upcoming";

  const { upcoming, past } = await getMyBookings();

  console.log("UPCOMING ------------" + JSON.stringify(upcoming));
  console.log("PAST ------------" + JSON.stringify(past));

  const bookings = tab === "past" ? past : upcoming;

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-12">
      <div className="mx-auto max-w-4xl">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View and manage your yoga class bookings
          </p>
        </div>

        {/* Tabs */}
        <BookingTabs activeTab={tab} />

        {/* Content */}
        <div className="mt-6 space-y-4">
          {bookings.length === 0 ? (
            <EmptyState
              title={
                tab === "upcoming"
                  ? "No upcoming bookings"
                  : "No past bookings"
              }
              description={
                tab === "upcoming"
                  ? "You don’t have any upcoming classes booked."
                  : "You haven’t attended any classes yet."
              }
              actionLabel={tab === "upcoming" ? "Browse classes" : null}
              actionHref={tab === "upcoming" ? "/classes" : null}
            />
          ) : (
            bookings.map((booking) => (
              <BookingCard
                key={booking.$id}
                booking={booking}
                variant={tab} // "upcoming" | "past"
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
