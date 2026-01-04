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


        // <div className="bg-white shadow rounded-lg p-4 mt-4
        //         flex flex-col sm:flex-row
        //         items-start
        //         gap-4 sm:gap-10"
        // >
        //     <input type="hidden" name="class_id" value={teacher.$id} />

        //     <div className="flex flex-col">
        //         <h4 className="text-lg font-semibold">{teacher.name}</h4>
        //     </div>
        //     <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        //         {/* <Link
        //             href={`/rooms/${room.$id}`}
        //             className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        //         >
        //             <FaEye className="inline mr-1" /> View
        //         </Link> */}

        //         <Link
        //             href={`/rooms/edit/${teacher.$id}`}
        //             className="bg-amber-500 text-gray-600 px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-amber-700 hover:text-white"
        //         >
        //             <FaEdit className="inline mr-1" /> Edit
        //         </Link>

        //         {/* <DeleteRoomButton roomId={room.$id} /> */}
        //     </div>
            
        // </div>
  )
}

export default TeacherCard