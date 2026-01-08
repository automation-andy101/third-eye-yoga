"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createTeacher from "/app/actions/createTeacher";

const AddTeacherForm = ({ teachers }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [isActive, setIsActive] = useState(true);

    const [state, formAction] = useFormState(createTeacher, {});
    const router = useRouter();

    useEffect(() => {
        if (state.error) toast.error(state.error);

        if (state.success) {
            toast.success("Teacher created successfully!");
            router.push("/admin/teachers");
        }
    }, [state, router]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <form action={formAction}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter yoga teachers name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        className="border rounded w-full h-24 py-2 px-3"
                        placeholder="Enter a bio for the yoga teacher"
                        required
                    ></textarea>
                </div>

                <div className="mb-8">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                        Image
                    </label>

                    {previewImage && (
                        <div className="mt-4">
                            <Image
                                src={previewImage}
                                alt="Teacher preview"
                                className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
                                width={400}
                                height={256}
                            />
                        </div>
                    )}

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
                                checked={isActive}
                                onChange={() => setIsActive((prev) => !prev)}
                                className="peer sr-only"
                            />

                            {/* Hidden fallback */}
                            <input 
                                type="hidden" 
                                name="isActive" 
                                value={isActive ? "true" : "false"}                              
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
    )
}

export default AddTeacherForm;