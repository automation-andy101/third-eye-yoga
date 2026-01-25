'use server'

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Query } from 'node-appwrite';
import { unstable_noStore as noStore } from 'next/cache';

async function getClassesForDay(date) {
    noStore();

    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    try {
        const { databases } = await createAdminClient();

        // Fetch classes
        const { documents: classes } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
            [
                Query.greaterThanEqual("start_at", start.toISOString()),
                Query.lessThan("start_at", end.toISOString()),
                Query.limit(100),
            ]
        );

        // Fetch teachers
        const { documents: teachers } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TEACHERS,
            [
                Query.limit(100),
            ]
        );

        // Create lookup map: teacherId -> teacher
        const teacherMap = Object.fromEntries(
            teachers.map((teacher) => [teacher.$id, teacher])
        );

        // Attach teacher to each class
        const classesWithTeachers = classes.map((cls) => ({
            ...cls,
            teacher: teacherMap[cls.teacher_id] || null,
        }));

        // Revalidate the cache for this path
        revalidatePath('/', 'layout');

        console.log("getClassesForDay - " + JSON.stringify(classesWithTeachers));
        return classesWithTeachers;

    } catch (error) {
        console.log("Failed to get classes", error);
        redirect("/error");
    }
}

export default getClassesForDay;