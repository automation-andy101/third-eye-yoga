"use client";

import { useState, useEffect } from "react";
import WeekDatePicker from "./WeekDatePicker";
import ClassCard from "./ClassCard";
import TeacherCard from "./TeacherCard";
import Link from "next/link";

export default function TeacherListPage({ getAllTeachers }) {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTeachers = async () => {
        setLoading(true);

        try {
            const teachers = await getAllTeachers();
            setTeachers(teachers);
        } catch (err) {
            console.error("Failed to fetch teachers:", err);
            setTeachers([]);
        }

        setLoading(false);
    };

    return (
        <div>
            <Link
                href={"/admin/teachers/new"}
                type="button"
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
                + Create Teacher
            </Link>
            
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
            </div>

            


            {/* Display teachers */}
            {loading ? (
                <p>Loading...</p>
            ) : teachers.length > 0 ? (
                teachers.map((teacher) => (
                <TeacherCard teacher={teacher} key={teacher.$id} />
                ))
            ) : (
                <div className="mt-8 flex justify-center">
                    <p className="mt-20 text-gray-600">No teachers available</p>
                </div>
            )}
        </div>
    );
}
