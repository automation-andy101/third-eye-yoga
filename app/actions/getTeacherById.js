'use server';

import { createAdminClient } from '/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Query } from 'node-appwrite';
import { unstable_noStore as noStore } from 'next/cache';

async function getTeacherById(id) {  
  try {
    const { databases } = await createAdminClient();

    // Fetch teachers
    const teacher = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TEACHERS,
      id
    );

    return teacher;
    
  } catch (error) {
    console.log('Failed to get teacher', error);
    return null;
  }
}

export default getTeacherById;
