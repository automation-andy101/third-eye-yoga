"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useClassStatus } from "@/app/hooks/useClassStatus";
import { formatTime, formatTimeEnd } from "@/app/utils/date";


const ClassCardBase = ({ yogaClass, actions }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isBioOpen, setIsBioOpen] = useState(false);
    const [clientTime, setClientTime] = useState("");

    useEffect(() => {
        if (!yogaClass?.start_at) return;

        const startDate = new Date(yogaClass.start_at);
        const endDate = new Date(startDate.getTime() + (yogaClass.duration || 0) * 60000);

        const formatted = `${startDate.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
            })} – ${endDate.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
        })}`;

        setClientTime(formatted);
    }, [yogaClass]);

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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[140px_1fr_160px] items-start">
                {/* COLUMN 1: Teacher image */}
                <div className="flex justify-center md:justify-start">
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

                {/* COLUMN 2: Class info + description */}
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="mb-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                            Class
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                            {yogaClass.title}
                        </h3>
                    </div>

                    <p className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                        with 
                        <span className="font-semibold text-gray-900">
                            {yogaClass.teacher.name}
                        </span>

                        {yogaClass.teacher.bio && (
                            <button
                                onClick={() => setIsBioOpen(true)}
                                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 underline-offset-2 hover:underline"
                            >
                                Show bio
                            </button>
                        )}
                    </p>

                    {/* Description */}
                    {yogaClass.description && (
                        <div className="mt-2">
                            <p
                                className={`text-sm text-gray-700 leading-relaxed transition-all ${
                                isExpanded ? "" : "line-clamp-2"
                                }`}
                            >
                                {yogaClass.description}
                            </p>

                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-1 text-indigo-600 text-sm font-medium text-gray-900 hover:underline"
                            >
                                {isExpanded ? "Show less" : "Show more"}
                            </button>
                        </div>
                    )}

                    <div className="pt-2 space-y-1">
                        <p>
                            🗓{" "}
                            {new Date(yogaClass.start_at).toLocaleDateString("en-GB", {
                                weekday: "long",
                                day: "numeric",
                                month: "short",
                            })}
                        </p>

                        <p>
                            🕒 {clientTime}
                        </p>

                        <p>
                            👥 {yogaClass.capacity - yogaClass.booked_count} spots remaining (
                            {yogaClass.booked_count} booked)
                        </p>
                    </div>
                </div>

                {/* COLUMN 3: Price + actions */}
                <div
                    className="
                        flex flex-col md:flex-col items-center md:items-end 
                        border-t border-gray-200 md:border-t-0 md:border-l pl-0 md:pl-6 pt-4 md:pt-0 h-full
                    "
                >
                    {/* Desktop Price */}
                    <div className="hidden md:block mb-auto text-right">
                        <span className="text-sm text-gray-500">Price</span>
                        <div className="text-3xl font-semibold text-gray-900">
                            £{yogaClass.price}
                        </div>
                    </div>

                    {/* Mobile Price + Button Row */}
                    <div className="flex md:hidden w-full justify-between items-center">
                        <div className="text-left">
                            <span className="text-sm text-gray-500">Price</span>
                            <div className="text-2xl font-semibold text-gray-900">
                                £{yogaClass.price}
                            </div>
                        </div>

                        {/* Book now button */}
                        <div>
                            {typeof actions === "function" ? actions(status) : actions}
                        </div>
                    </div>

                    {/* Desktop Button */}
                    <div className="hidden md:flex mt-auto w-full justify-center gap-3">
                        {typeof actions === "function" ? actions(status) : actions}
                    </div>
                </div>
            </div>

            {isBioOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsBioOpen(false)}
                    />

                        {/* Modal */}
                        <div
                            className="
                                fixed inset-0
                                w-screen h-screen
                                bg-white
                                overflow-y-auto
                                p-6

                                md:inset-auto
                                md:top-1/2 md:left-1/2
                                md:-translate-x-1/2 md:-translate-y-1/2
                                md:w-full md:max-w-lg
                                md:h-auto
                                md:rounded-xl
                                md:shadow-xl
                            "
                        >
                        {/* Close button */}
                        <button
                            onClick={() => setIsBioOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        <div className="mt-8 flex gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-full shrink-0">
                                <Image
                                    src={imageSrc}
                                    alt={yogaClass.teacher.name}
                                    width={80}
                                    height={80}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {yogaClass.teacher.name}
                                </h3>

                                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                    {yogaClass.teacher.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ClassCardBase;