"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import getTeacherById from "@/app/actions/getTeacherById";
import editTeacher from "/app/actions/editTeacher";

const EditTeacherForm = ({ teacher }) => {
    const textareaRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [isActive, setIsActive] = useState(teacher.is_active);

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${teacher.image_id}/view?project=${projectId}`;
    const imageSrc = previewImage ? previewImage : teacher.image_id ? imageUrl : "/images/no-image.jpg";

    const [state, formAction] = useFormState(editTeacher, {});
    const router = useRouter();

    useEffect(() => {
        if (state?.error) toast.error(state.error);

        if (state?.success) {
            toast.success("Teacher updated successfully!");
            router.push("/app/admin/teachers");
        }
    }, [state, router]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
        }
    }, [teacher.bio]);
        
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                <form action={formAction}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Teacher Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Enter a name (Large Conference Room)"
                            defaultValue={teacher.name}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
                            Bio
                        </label>
                        <textarea
                        ref={textareaRef}
                            id="bio"
                            name="bio"
                            rows={1}
                            defaultValue={teacher.bio}
                            className="w-full resize-none overflow-hidden rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
                            placeholder="Enter a bio for the yoga teacher"
                            required
                            onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height = e.target.scrollHeight + "px";
                            }}
                        ></textarea>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                            Image
                        </label>

                        <Image
                            src={imageSrc}
                            alt={teacher.name}
                            className="w-full sm:w-1/3 h-64 object-cover rounded-lg mb-4"
                            width={400}
                            height={100}
                        />

                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="border rounded w-full py-2 px-3"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setPreviewImage(URL.createObjectURL(file));
                                }
                            }}
                        />

                        <input
                            type="hidden"
                            name="existingImage"
                            value={teacher.image_id}
                        />

                        <input
                            type="hidden"
                            name="teacherId"
                            value={teacher.$id}
                        />

                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Teacher Status
                        </label>

                        <div className="flex items-center gap-4">
                            {/* Toggle */}
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
                                    className="peer sr-only"
                                />

                                {/* Track */}
                                <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-green-500"></div>

                                {/* Thumb */}
                                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></div>
                            </label>

                            {/* State label */}
                            <span className="text-sm font-medium text-gray-700">
                                {isActive ? "Active" : "Inactive"}
                            </span>
                        </div>

                        {/* Helper text */}
                        <p className="mt-1 text-xs text-gray-500">
                            Active teachers appear in class bookings
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTeacherForm