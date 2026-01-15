"use server";

import { createAdminClient } from "/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";


async function deleteClass(yogaClassId) {
    const { databases } = await createAdminClient();

    try {
        const { user, isAdmin } = await checkAuth();

        if (!user) {
            return {
                error: "You must be logged in to delete a class"
            }
        }

        if (!isAdmin) {
            return { error: 'You must belong to the admin team to delete a class' };
        }


        // Delete class
        const newClass = await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
            yogaClassId,
        );

        revalidatePath("/admin/classes/");

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

export default deleteClass;