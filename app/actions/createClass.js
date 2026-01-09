"use server";

import { createAdminClient } from "/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";


async function createClass(previousState, formData) {
    const { databases } = await createAdminClient();

    try {
        const { user, isAdmin } = await checkAuth();

        if (!user) {
            return {
                error: "You must be logged in to create a class"
            }
        }

        if (!isAdmin) {
            return { error: 'You must belong to the admin team to create a class' };
        }

        // Create a class
        const newClass = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
            ID.unique(),
            {
                start_at: new Date(formData.get('start_at')).toISOString(),
                duration: Number(formData.get('duration')),
                title: formData.get('title'),
                description: formData.get('description'),
                teacher_id: formData.get('teacher_id'),
                capacity: Number(formData.get('capacity')),
                booked_count: 0,
                location: formData.get('location'),
                price: Number(formData.get('price')),
                is_active: formData.get('is_active') === 'true',
            }
        );

        revalidatePath("/", "/layout");

        return {
            success: true
        }

    } catch (error) {
        console.log("-----------------" + error);
        const errorMessage = error.response.message || "An unexpected error has occurred!";

        return {
            error: errorMessage
        }
    }
}


export default createClass;