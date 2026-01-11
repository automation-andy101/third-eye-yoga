"use server";

import { createAdminClient } from "/config/appwrite";
import { Query } from "node-appwrite";
import { unstable_noStore as noStore } from "next/cache";

function getCurrentWeekRange() {
  const today = new Date();

  const day = today.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // make Monday start

  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}

async function getClassesForCurrentWeekWithTeachers() {
  noStore();

  try {
    const { databases } = await createAdminClient();
    const { monday, sunday } = getCurrentWeekRange();

    /* ----------------------------------
       1. Fetch classes for current week
    ----------------------------------- */
    const { documents: classes } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
      [
        Query.greaterThanEqual("start_at", monday.toISOString()),
        Query.lessThanEqual("start_at", sunday.toISOString()),
        Query.orderAsc("start_at"),
        Query.limit(100),
      ]
    );

    if (!classes.length) return [];

    /* ----------------------------------
       2. Fetch all teachers
    ----------------------------------- */
    const { documents: teachers } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TEACHERS,
      [Query.limit(100)]
    );

    /* ----------------------------------
       3. Build lookup map
       teacherId -> teacher object
    ----------------------------------- */
    const teacherMap = Object.fromEntries(
      teachers.map((teacher) => [teacher.$id, teacher])
    );

    /* ----------------------------------
       4. Attach teacher to each class
    ----------------------------------- */
    const classesWithTeachers = classes.map((yogaClass) => ({
      ...yogaClass,
      teacher: teacherMap[yogaClass.teacher_id] || null,
    }));

    return classesWithTeachers;
  } catch (error) {
    console.error("Failed to get classes with teachers for current week", error);
    return [];
  }
}

export default getClassesForCurrentWeekWithTeachers;
