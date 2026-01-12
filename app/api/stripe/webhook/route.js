import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.arrayBuffer();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(body),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse("Webhook Error", { status: 400 });
  }


  // Only handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const classId = session.metadata.classId;
    const userId = session.metadata.userId;
    const paymentIntentId = session.payment_intent;
    const userEmail = session.metadata.students_email;
    const studentName = session.metadata.students_name || "Guest";

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
            user_id: userId,
            students_name: studentName,
            students_email: userEmail || "Guest",
            payment_intent_id: paymentIntentId,
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
