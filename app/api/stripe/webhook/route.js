import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/config/appwrite";
import { ID, Query } from "node-appwrite";

export const config = {
  api: {
    bodyParser: false, // Required for raw body verification
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req) {
  const buf = await buffer(req.body);
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Only handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const classId = session.metadata.classId;
    const paymentIntentId = session.payment_intent;
    const userEmail = session.customer_email; // Optional: can use for guest users

    try {
      const { databases } = await createAdminClient();

      // Fetch the class to get current booked_count
      const yogaClass = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
        classId
      );

      if (!yogaClass) throw new Error("Class not found");

      // Create a booking
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        ID.unique(),
        {
          class_id: classId,
          user_email: userEmail || "Guest",
          payment_intent_id: paymentIntentId,
          created_at: new Date().toISOString(),
        }
      );

      // Increment booked_count
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CLASSES,
        classId,
        { booked_count: (yogaClass.booked_count || 0) + 1 }
      );

      console.log(`Booking created for class ${classId}`);
    } catch (err) {
      console.error("Failed to create booking:", err);
      return new NextResponse(`Server error: ${err.message}`, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
