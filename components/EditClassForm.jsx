"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import editClass from "/app/actions/editClass";
import getAllTeachers from "@/app/actions/getAllTeachers";

const EditClassForm = ({ yogaClass, teachers }) => {
    console.log("------------" + JSON.stringify(yogaClass.teacher.name));
    const textareaRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [isActive, setIsActive] = useState(yogaClass.is_active);

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${yogaClass.teacher.image_id}/view?project=${projectId}`;
    const imageSrc = previewImage ? previewImage : yogaClass.teacher.image_id ? imageUrl : "/images/no-image.jpg";

    const [state, formAction] = useFormState(editClass, {});
    const router = useRouter();

    useEffect(() => {
        if (state.error) toast.error(state.error);

        if (state.success) {
            toast.success("Class created successfully!");
            router.push("/admin/classes/");
        }
    }, [state, router]);

    const formatForDateTimeLocal = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);

        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);
    };

    return (
        <>
            <form action={formAction}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter a title for the class"
                        defaultValue={yogaClass.title}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="border rounded w-full h-24 py-2 px-3"
                        placeholder="Enter a description for the class"
                        defaultValue={yogaClass.description}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Teacher</label>
                    <select
                        name="teacher_id"
                        defaultValue={yogaClass.teacher.$id}
                        required
                        className="border rounded w-full px-3 py-2"
                    >
                        <option value="">Select a teacher</option>

                        {teachers.map((teacher) => (
                            <option key={teacher.$id} value={teacher.$id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                </div>    

                <div className="mb-4">
                    <label htmlFor="sqft" className="block text-gray-700 font-bold mb-2">
                        Start Date/Time
                    </label>
                    <input
                        type="datetime-local"
                        id="start_at"
                        name="start_at"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Select a start date/time for class"
                        defaultValue={formatForDateTimeLocal(yogaClass.start_at)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
                        Duration (mins)
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter duration of class"
                        defaultValue={yogaClass.duration}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter class location"
                        defaultValue={yogaClass.location}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="capacity" className="block text-gray-700 font-bold mb-2">
                        Capacity
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Number of people the class can hold"
                        defaultValue={yogaClass.capacity}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="price_per_hour"
                        className="block text-gray-700 font-bold mb-2">
                        Price (£)
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter price per person for class"
                        defaultValue={yogaClass.price}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                        Booked Count
                    </label>
                    <input
                        type="number"
                        id="booked_count"
                        name="booked_count"
                        className="border rounded w-full py-2 px-3"
                        defaultValue={yogaClass.booked_count}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Class Status
                    </label>

                    <div className="flex items-center gap-4">
                        {/* Toggle */}
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
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
                            {isActive ? "Scheduled" : "Cancelled"}
                        </span>
                    </div>
                </div>

                {/* <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                        Image
                    </label>

                    <Image
                        src={imageSrc}
                        alt={yogaClass.teacher.name}
                        className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
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
                        value={yogaClass.teacher.image_id}
                    />
                </div> */}

                <input
                    type="hidden"
                    name="yogaClassId"
                    value={yogaClass.$id}
                />

                <div className="flex flex-col gap-5">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditClassForm;