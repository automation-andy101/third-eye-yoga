"use server";

import { createAdminClient } from "/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";


async function createTeacher(previousState, formData) {
    const { databases } = await createAdminClient();

    try {
        const { user, isAdmin } = await checkAuth();

        if (!user) {
            return {
                error: "You must be logged in to create a yoga teacher"
            }
        }

        if (!isAdmin) {
            return { error: 'You must belong to the admin team to create a yoga teacher' };
        }

        // Create a yoga teacher
        const newClass = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TEACHERS,
            ID.unique(),
            {
                name: formData.get('name'),
                bio: formData.get('bio'),
                image_id: formData.get('image_id'),
            }
        );

        revalidatePath("/", "/layout");

        return {
            success: true
        }

    } catch (error) {
        const errorMessage = error.response.message || "An unexpected error has occurred!";

        return {
            error: errorMessage
        }
    }
}


export default createTeacher;