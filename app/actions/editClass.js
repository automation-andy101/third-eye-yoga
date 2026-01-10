"use server";

import { createAdminClient } from "/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";


async function editClass(previousState, formData) {
    const { databases, storage } = await createAdminClient();

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

        const yogaClassId = formData.get("yogaClassId");

        // Parse isActive value from string e.g. 'true' to a boolen
        const isActive = formData.get("isActive") === "true";

        // Uploading image
        const teacherId = formData.get("teacherId");
        // const existingImage = formData.get("existingImage");
        // const image = formData.get("image");
        // let imageId = existingImage;

        // Only upload if a NEW image was provided
        // if (image && image.size > 0 && image.name !== "undefined") {
        //     try {
        //         const uploaded = await storage.createFile(
        //             process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_TEACHERS,
        //             ID.unique(), 
        //             image
        //         );
        //         imageId = uploaded.$id;
        //     } catch (error) {
        //         console.log("Error uploading image", error);
        //         return {
        //             error: "Error uploading image"
        //         }
        //     }
        // }

        // Update class
        const newClass = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
            yogaClassId,
            {
                start_at: new Date(formData.get('start_at')).toISOString(),
                duration: Number(formData.get('duration')),
                title: formData.get('title'),
                description: formData.get('description'),
                teacher_id: formData.get('teacher_id'),
                capacity: Number(formData.get('capacity')),
                booked_count: Number(formData.get('booked_count')),
                location: formData.get('location'),
                price: Number(formData.get('price')),
                teacher_id: formData.get('teacher_id'),
                is_active: isActive,
            }
        );

        revalidatePath("/admin/classes/");
        revalidatePath(`/admin/classes/${teacherId}/edit/`);

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

export default editClass;