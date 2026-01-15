"use client";

import Link from "next/link";

const ClassCardBookingActions = ({ yogaClass, status }) => {
    const { isDisabled, buttonLabel } = status;
    
    return (
        <Link href={`/checkout/${yogaClass.$id}`}>
            <button
                disabled={isDisabled}
                className={`mt-4 w-full rounded px-4 py-2 text-sm font-medium transition
                ${
                    isDisabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }
                `}
            >
                {buttonLabel}
            </button>
        </Link>
    )
}

export default ClassCardBookingActions;