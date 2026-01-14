"use client";

import Link from "next/link";
import AdminClassCard from "./AdminClassCardOLD";

const AdminDashboardPage = ({ classes, teachers, bookings }) => {
  const totalClassesForCurrentWeek = classes.length;
  const totalTeachers = teachers.length;
  const totalBookingsThisWeek = bookings.length ?? 0;
  const totalStudents = 120; // placeholder

  const upcomingClasses = classes.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1> */}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Stat title="Classes This Week" value={totalClassesForCurrentWeek} />
            <Stat title="Teachers" value={totalTeachers} />
            <Stat title="Bookings This Week" value={totalBookingsThisWeek} />
            <Stat title="Total Students" value={totalStudents} />
        </div>

        {/* Upcoming Classes */}
        <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Classes This Week</h2>
            {upcomingClasses.length > 0 ? (
            upcomingClasses.map((yogaClass) => (
                <AdminClassCard key={yogaClass.$id} yogaClass={yogaClass} />
            ))
            ) : (
            <p className="text-gray-600">No upcoming classes</p>
            )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href="/admin/classes/new"
                    className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                        +
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 group-hover:text-blue-700">
                            Create Class
                        </p>
                        <p className="text-sm text-gray-500">
                            Schedule a new yoga class
                        </p>
                    </div>
                </Link>

                <Link
                    href="/admin/teachers/new"
                    className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 text-xl font-bold">
                        +
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 group-hover:text-green-700">
                            Add Teacher
                        </p>
                        <p className="text-sm text-gray-500">
                            Register a new instructor
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default AdminDashboardPage;
