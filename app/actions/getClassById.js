'use server';

import { createAdminClient } from '/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Query } from 'node-appwrite';
import { unstable_noStore as noStore } from 'next/cache';

async function getClassById(id) {  
  try {
    const { databases } = await createAdminClient();

    // Fetch class by ID
    const yogaClass = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
      id
    );

    return yogaClass;
    
  } catch (error) {
    console.log('Failed to get class', error);

    return null;
  }
}

export default getClassById;
