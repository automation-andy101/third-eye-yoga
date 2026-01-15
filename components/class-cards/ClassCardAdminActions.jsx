"use client";

import Link from "next/link";

const ClassCardAdminActions = ({ yogaClass, onDelete }) => {
    return (
        <>
            <Link
                href={`/admin/classes/${yogaClass.$id}/edit`}
                className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
                Edit
            </Link>

            <button 
                onClick={() => onDelete(yogaClass.$id)}
                className="ml-2 inline-flex items-center rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
                Delete
            </button>   
        </>
    )
}

export default ClassCardAdminActions;