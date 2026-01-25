"use client";

import { useState, useEffect } from "react";
import WeekDatePicker from "./WeekDatePicker";
import ClassCard from "./ClassCard";
import ClassCardVariation from "./ClassCardVariation";
import ClassCardBookingActions from "./class-cards/ClassCardBookingActions";
import ClassCardBase from "./class-cards/ClassCardBase";

export default function WeekSchedule({ getClassesForDay }) {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchClasses = async (date) => {
        setLoading(true);

        try {
            const dayClasses = await getClassesForDay(date);
            console.log(dayClasses);
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
            {/* Header / Actions */}
            <div className="mt-6 mb-4 flex items-center justify-between gap-4">
                {/* Date picker */}
                <WeekDatePicker onSelect={handleDateSelect} />
            </div>

            {/* Display classes */}
            {loading ? (
                <p>Loading...</p>
            ) : classes.length > 0 ? (
                classes.map((yogaClass) => (
                    <ClassCardBase 
                        yogaClass={yogaClass} 
                        actions={(status) => (
                            <ClassCardBookingActions
                                yogaClass={yogaClass}
                                status={status}
                            />
                        )}
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
}
