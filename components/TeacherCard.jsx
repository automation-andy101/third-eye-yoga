"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import getTeacherById from "@/app/actions/getTeacherById";

const TeacherCard = ({ teacher }) => {

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${teacher.image_id}/view?project=${projectId}`;
    const imageSrc = yogaClass.teacher.image_id
                ? `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${teacher.image_id}/view?project=${projectId}`
                : "/images/no-image.jpg";

    return (
        <div className="bg-white shadow rounded-lg p-4 mt-4
                flex flex-col sm:flex-row
                items-start
                gap-4 sm:gap-10"
        >
            <input type="hidden" name="class_id" value={yogaClass.$id} />

            {/* Duration  */}
            <div className="flex flex-col space-y-3 shrink-0">
                <div>
                    <h4 className="text-lg font-semibold">{time}</h4>
                    <p className="text-sm font-semibold text-gray-800">
                        {yogaClass.duration} min
                    </p>
                </div>

                <div className="w-20 h-20">
                    <Image
                        src={imageSrc}
                        alt={yogaClass.teacher.name || "Teacher"}
                        className="w-full h-full object-cover rounded-full"
                        width={200}
                        height={200}
                    />
                </div>
            </div>
            
            {/* Class description  */}
            <div className="flex-1 max-w-lg sm:max-w-xl space-y-2">
                <h4 className="text-lg font-semibold">{yogaClass.title}</h4>
                <p className="text-sm font-semibold text-gray-800">
                    {yogaClass.teacher.name}
                </p>
                <p className="text-sm text-gray-600 line-clamp-4">
                    {yogaClass.description}
                </p>
            </div>

            {/* Location */}
            <div className="shrink-0 w-48 self-center sm:ml-6">
                <h4 className="text-sm font-semibold">{yogaClass.location}</h4>
            </div>

            {/* Book */}
            <div className="shrink-0 self-center">
                <Link href={`/checkout/${yogaClass.$id}`}>
                    <button
                        // onClick={() => Router.push(`/checkout/${yogaClass.$id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded
                                w-32 text-center hover:bg-blue-700">
                        Book
                    </button>
                </Link>
            </div>
        </div>
  )
}

export default TeacherCard