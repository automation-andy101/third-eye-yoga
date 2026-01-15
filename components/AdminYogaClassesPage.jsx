"use client";

import { useState, useEffect } from "react";
import DatePicker from "./DatePicker";
import AdminClassCard from "./AdminClassCardOLD";
import ClassCardAdminActions from "./class-cards/ClassCardAdminActions";
import ClassCardBase from "./class-cards/ClassCardBase";
import Link from "next/link";

const AdminYogaClassesPage = ({ getClassesForDay }) => {
    const [classesForSelectedDay, setClassesForSelectedDay] = useState([]);
    const [loading, setLoading] = useState(false);

    // On initial load, fetch classes for today
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        fetchClasses(today);
    }, []);

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

    const handleDelete = async (classId) => {
        if (!confirm("Are you sure you want to delete this class?")) return;

        await deleteClass(classId);
        Router.refresh();
    }

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
                        // <AdminClassCard yogaClass={yogaClass} key={yogaClass.$id} />
                        <ClassCardBase 
                            yogaClass={yogaClass} 
                            actions={
                                <ClassCardAdminActions
                                    yogaClass={yogaClass}
                                    onDelete={handleDelete}
                                />
                            }
                            key={yogaClass.$id}
                        />
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
