"use server";

import { createAdminClient } from "/config/appwrite";
import { Query } from "node-appwrite";
import { unstable_noStore as noStore } from "next/cache";

function getCurrentWeekRange() {
  const today = new Date();

  const day = today.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}

async function getClassesForCurrentWeek() {
  noStore();

  try {
    const { databases } = await createAdminClient();
    const { monday, sunday } = getCurrentWeekRange();

    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
      [
        Query.greaterThanEqual("start_at", monday.toISOString()),
        Query.lessThanEqual("start_at", sunday.toISOString()),
        Query.orderAsc("start_at"),
        Query.limit(100),
      ]
    );

    return documents;
  } catch (error) {
    console.error("Failed to get classes for current week", error);
    return [];
  }
}

export default getClassesForCurrentWeek;
