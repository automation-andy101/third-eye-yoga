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

    // Fetch teachers for today on initial load
    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <div>
            {/* Header / Actions */}
            <div className="mb-6 flex justify-end">
                <Link
                    href="/admin/teachers/new"
                    data-testid="create-teacher-button"
                    className="inline-flex items-center rounded-lg bg-gray-800 px-6 py-3 text-base font-medium text-white hover:bg-gray-700"
                >
                    + Create Teacher
                </Link>
            </div>

            {/* Content */}
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : teachers.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {teachers.map((teacher) => (
                        <TeacherCard teacher={teacher} key={teacher.$id} />
                    ))}
                </div>
            ) : (
                <div className="mt-16 flex justify-center">
                    <p 
                        data-testid="no-teachers-availablae-text"
                        className="text-gray-600">No teachers available
                    </p>
                </div>
            )}
        </div>
    );
}
