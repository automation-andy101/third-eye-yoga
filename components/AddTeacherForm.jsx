"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createTeacher from "/app/actions/createTeacher";

const AddTeacherForm = ({ teachers }) => {
    const [state, formAction] = useFormState(createTeacher, {});
    const router = useRouter();

    useEffect(() => {
        if (state.error) toast.error(state.error);

        if (state.success) {
            toast.success("Teacher created successfully!");
            router.push("/");
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

                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="border rounded w-full py-2 px-3"
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

export default AddTeacherForm;