"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEdit } from "react-icons/fa";
// import DeleteRoomButton from "./DeleteRoomButton";


const TeacherCard = ({ teacher }) => {

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${teacher.image_id}/view?project=${projectId}`;
    const imageSrc = teacher.image_id
                ? `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${teacher.image_id}/view?project=${projectId}`
                : "/images/no-image.jpg";

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            {/* Image */}
            <div className="relative h-48 w-full bg-gray-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                    </div>
                )}

                {/* Active badge */}
                <span
                className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                    teacher.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
                >
                {teacher.is_active ? "Active" : "Inactive"}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    {teacher.name}
                </h2>

                <p className="mb-4 text-sm text-gray-600 line-clamp-4">
                    {teacher.bio}
                </p>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between">
                    <Link
                        href={`/admin/teachers/${teacher.$id}/edit`}
                        className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                    >
                        Edit
                    </Link>

                    <Link
                        href={`/admin/teachers/${teacher.$id}`}
                        className="text-sm font-medium text-gray-600 hover:underline"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
  )
}

export default TeacherCard