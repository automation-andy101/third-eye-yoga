'use server'


import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Query } from 'node-appwrite';

async function getAllClasses() {
    try {
        const { databases } = await createAdminClient();

        // Fetch classes
        const { documents: classes } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
            [
                Query.limit(100),
                Query.offset(0),
            ]
        );

        // Revalidate the cache for this path
        revalidatePath('/', 'layout');

        return classes;

    } catch (error) {
        console.log("Failed to get classes", error);
        redirect("/error");
    }
}

export default getAllClasses;