"use client";

import { useState } from "react";
import DatePicker from "./DatePicker";
import AdminClassCard from "./AdminClassCard";
import Link from "next/link";

const AdminYogaClassesPage = ({ getClassesForDay }) => {
  const [classesForSelectedDay, setClassesForSelectedDay] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClasses = async (date) => {
    setLoading(true);
    try {
      const classes = await getClassesForDay(date);
      setClassesForSelectedDay(classes);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
      setClassesForSelectedDay([]);
    }
    setLoading(false);
  };

  return (
    <div>
        {/* Header / Actions */}
        <div className="mb-2 flex items-center justify-between gap-4">
            <DatePicker onSelect={fetchClasses} />

            <Link
                href="/admin/classes/new"
                className="inline-flex items-center rounded-lg bg-gray-800 px-6 py-2.5 text-base font-medium text-white hover:bg-gray-700"
            >
                + Create Class
            </Link>
        </div>

        {/* Display classes */}
        {loading ? (
            <p>Loading...</p>
        ) : classesForSelectedDay.length > 0 ? (
            classesForSelectedDay.map((yogaClass) => (
            <AdminClassCard yogaClass={yogaClass} key={yogaClass.$id} />
            ))
        ) : (
            <div className="mt-8 flex justify-center">
            <p className="mt-20 text-gray-600">No classes available</p>
            </div>
        )}
    </div>
  );
};

export default AdminYogaClassesPage;
