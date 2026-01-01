"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createClass from "/app/actions/createClass";

const AddClassForm = ({ teachers }) => {
    const [state, formAction] = useFormState(createClass, {});
    const router = useRouter();

    useEffect(() => {
        if (state.error) toast.error(state.error);

        if (state.success) {
            toast.success("Class created successfully!");
            router.push("/");
        }
    }, [state, router]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
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
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Teacher</label>
                    <select
                        name="teacher_id"
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
                        required
                    />
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

export default AddClassForm