"use server";

import { createAdminClient } from "/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";


async function createTeacher(previousState, formData) {
    const { databases, storage } = await createAdminClient();

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

        // Parse isActive value from string e.g. 'true' to a boolen
        const isActive = formData.get("isActive") === "true";

        const image = formData.get("image");
        let imageId;

        // Only upload if a NEW image was provided
        if (image && image.size > 0 && image.name !== "undefined") {
            try {
                const uploaded = await storage.createFile(
                    process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS,
                    ID.unique(), 
                    image
                );
                imageId = uploaded.$id;
            } catch (error) {
                console.log("Error uploading image", error);
                return {
                    error: "Error uploading image"
                }
            }
        }

        // Create a yoga teacher
        const newClass = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TEACHERS,
            ID.unique(),
            {
                name: formData.get('name'),
                bio: formData.get('bio'),
                is_active: isActive,
                image_id: imageId,
            }
        );

        revalidatePath("/admin/teachers/");

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