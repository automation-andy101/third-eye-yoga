import Link from "next/link";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your spot has been reserved. See you on the mat!
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        >
          Back to Class Schedule
        </Link>
      </div>
    </div>
  );
}
