// AddClassPage.jsx
"use server";

import Heading from "/components/Heading";
import AddClassForm from "@/components/AddClassForm";
import checkAuth from "@/app/actions/checkAuth";
import getAllTeachers from "@/app/actions/getAllTeachers";
import Link from "next/link";


const AdminClassesPage = async () => {
  const teachers = await getAllTeachers();
  const { isAdmin } = await checkAuth();

  if (!isAdmin) {
    return <p>You are not authorised to view this page.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Heading title="[Admin] Classses" />

        <Link
          href={"/admin/classes/new"}
          type="button"
          className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          + Create Class
        </Link>

        {/* Date Picker */}
        <div className="mt-4 mb-8">
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select date
          </label>

          <input
            type="date"
            id="date"
            className="w-60 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>

      {/* Classes for selected date */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Class Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <h2 className="mb-1 text-lg font-medium text-gray-900">
            Vinyasa Flow
          </h2>

          <p className="text-sm text-gray-600">
            18:00 – 19:00
          </p>

          <p className="mt-2 text-sm text-gray-700">
            Teacher: Andy
          </p>

          <p className="text-sm text-gray-700">
            Capacity: 12
          </p>

          <div className="mt-4">
            <button className="text-sm font-medium text-gray-800 hover:underline">
              Edit class
            </button>
          </div>
        </div>

        {/* Empty-state example card (optional) */}
        {/* 
        <div className="col-span-full rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="mb-4 text-sm text-gray-600">
            No classes scheduled for this day
          </p>

          <button className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
            + Create a class for this day
          </button>
        </div>
        */}




        {/* <WeekSchedule getClassesForDay={getClassesForDay} /> */}
      </div>
    </div>
  </div>
  );
};

export default AdminClassesPage;
