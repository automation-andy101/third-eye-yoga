"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useClassStatus } from "@/app/hooks/useClassStatus";
import { formatTime, formatTimeEnd } from "@/app/utils/date";


const ClassCardBase = ({ yogaClass, actions }) => {
    const [time, setTime] = useState("");

    const status = useClassStatus(yogaClass);
    const { isFullyBooked, statusLabel, statusClasses } = status;


    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageSrc = yogaClass.teacher.image_id
                ? `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${yogaClass.teacher.image_id}/view?project=${projectId}`
                : "/images/no-image.jpg";

    return (
        <div className={`relative mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm
            ${isFullyBooked ? "opacity-80" : "hover:shadow-md"}
        `}
        >
            <div className="grid grid-cols-[140px_260px_1fr_180px] gap-6 items-start">
                {/* COLUMN 1: Teacher image */}
                <div className="flex justify-center mt-2">
                    <div className="w-32 h-32 overflow-hidden rounded-full">
                        <Image
                            src={imageSrc}
                            alt={yogaClass.teacher.name || "Teacher"}
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* COLUMN 2: Date / time / capacity */}
                <div className="space-y-2 text-sm text-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {yogaClass.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-3">
                        with {yogaClass.teacher.name}
                    </p>

                    <p>
                        🗓{" "}
                        {new Date(yogaClass.start_at).toLocaleDateString("en-GB", {
                            weekday: "long",
                            day: "numeric",
                            month: "short",
                        })}
                    </p>

                    <p>
                        🕒 {formatTime(yogaClass.start_at)} –{" "}
                        {formatTimeEnd(yogaClass.start_at, yogaClass.duration)}
                    </p>

                    <p>
                        👥 {yogaClass.capacity - yogaClass.booked_count} spots remaining (
                        {yogaClass.booked_count} booked)
                    </p>
                </div>

                    {/* COLUMN 3: Title + teacher + description */}
                <div className="mt-2">
                    {yogaClass.description && (
                        <>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Class Description
                            </p>
                            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                                {yogaClass.description}
                            </p>
                        </>
                    )}
                </div>

                {/* COLUMN 4: Status + actions */}
                <div className="flex flex-col items-end h-full">
                    {/* Status badge */}
                    {statusLabel && (
                        <span
                            className={`mb-4 rounded-full px-3 py-1 text-xs font-medium ${statusClasses}`}
                        >
                            {statusLabel}
                        </span>
                    )}
                
                    <div className="mt-auto">
                        {typeof actions === "function" ? actions(status) : actions}
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default ClassCardBase;