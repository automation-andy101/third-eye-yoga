"use client";

import Link from "next/link";
import AdminClassCard from "./AdminClassCard";

const AdminDashboardPage = ({ getClassesForDay }) => {
    // Example data placeholders if nothing is passed
  const totalClasses = classes?.length ?? 0;
  const totalTeachers = teachers?.length ?? 0;
  const upcomingBookings = classes?.reduce((acc, cls) => acc + cls.booked_count, 0) ?? 0;
  const totalStudents = 120; // Replace with real data

  const upcomingClasses = classes?.slice(0, 5) ?? [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <p className="text-sm text-gray-500">Classes This Week</p>
          <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <p className="text-sm text-gray-500">Teachers</p>
          <p className="text-2xl font-bold text-gray-900">{totalTeachers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <p className="text-sm text-gray-500">Upcoming Bookings</p>
          <p className="text-2xl font-bold text-gray-900">{upcomingBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Classes</h2>
        <div className="space-y-4">
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((yogaClass) => (
              <AdminClassCard yogaClass={yogaClass} key={yogaClass.$id} />
            ))
          ) : (
            <p className="text-gray-600">No upcoming classes</p>
          )}
        </div>
      </div>

      {/* Teacher Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Teacher Activity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teachers?.map((teacher) => (
            <div key={teacher.$id} className="bg-white p-4 rounded-lg shadow">
              <p className="font-medium text-gray-900">{teacher.name}</p>
              <p className="text-sm text-gray-500">{teacher.classes?.length ?? 0} classes this week</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/classes/new"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            + Create Class
          </Link>
          <Link
            href="/admin/teachers/new"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            + Add Teacher
          </Link>
        </div>
      </div>
    </div>
    );
};

export default AdminDashboardPage;
