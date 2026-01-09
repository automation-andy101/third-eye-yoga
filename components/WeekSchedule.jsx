"use client";

import { useState, useEffect } from "react";
import WeekDatePicker from "./WeekDatePicker";
import ClassCard from "./ClassCard";

export default function WeekSchedule({ getClassesForDay }) {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchClasses = async (date) => {
        setLoading(true);

        try {
            const dayClasses = await getClassesForDay(date);
            setClasses(dayClasses);
        } catch (err) {
            console.error("Failed to fetch classes:", err);
            setClasses([]);
        }

        setLoading(false);
    };

    // Fetch classes for today on initial load
    useEffect(() => {
        const today = new Date();
        const dateString = today.toISOString().split("T")[0]; 
        fetchClasses(dateString);
    }, []);

    const handleDateSelect = (date) => {
        fetchClasses(date);
    };

    return (
        <div>
            {/* Date picker */}
            <WeekDatePicker onSelect={handleDateSelect} />

            {/* Display classes */}
            {loading ? (
                <p>Loading...</p>
            ) : classes.length > 0 ? (
                classes.map((yogaClass) => (
                    <ClassCard yogaClass={yogaClass} key={yogaClass.$id} />
                ))
            ) : (
                <div className="mt-8 flex justify-center">
                    <p className="mt-20 text-gray-600">No classes available</p>
                </div>
            )}

        </div>
    );
}
