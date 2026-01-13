'use server';

import { createAdminClient } from '/config/appwrite';
import { Query } from 'node-appwrite';
import { unstable_noStore as noStore } from 'next/cache';

async function getMyBookings(userId) {  
  try {
    const { databases } = await createAdminClient();
    const now = new Date();

    // Fetch bookings by user ID
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [
        Query.equal("user_id", userId),
        Query.orderDesc("$createdAt"),
        Query.limit(100)
      ]
    );

    if (!bookings.length) {
      return {
        upcoming: [],
        past: []
      }
    }

    const classIds = bookings.map((b) => b.class_id);

    const { documents: classes } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
      [
        Query.equal("$id", classIds)
      ]
    );

    // Create lookup map
    const classMap = Object.fromEntries(
      classes.map((c) => [c.$id, c])
    );

    // Attach class to booking
    const bookingsWithClasses = bookings.map((booking) => ({
      ...booking,
      class: classMap[booking.class_id] || null,
    }));

    // Split upcoming vs past
    const upcoming = bookingsWithClasses.filter(
      (b) => b.class && new Date(b.class.start_at) > now
    );

    const past = bookingsWithClasses.filter(
      (b) => b.class && new Date(b.class.start_at) <= now
    );

    return {
      upcoming,
      past
    };
    
  } catch (error) {
    console.log('Failed to get bookings', error);

    return { upcoming: [], past: [] };
  }
}

export default getMyBookings;
