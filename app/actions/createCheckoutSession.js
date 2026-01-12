"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSessionClient } from "/config/appwrite";
import checkAuth from "./checkAuth";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function createCheckoutSession(formData) {
  let userId = null;
  const { user } = await checkAuth();

  if (user) {
    userId = user.id;
  }

  const classId = formData.get("classId");
  const classPrice = parseFloat(formData.get("price")) * 100; // £8 → 800p

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_creation: "always",
    line_items: [
        {
            price_data: {
                currency: "gbp",
                product_data: {
                    name: "Yoga class",
                },
                unit_amount: classPrice,
            },
            quantity: 1,
        },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${classId}`,
    metadata: {
      classId,
      userId,
      students_name: formData.get("students_name"),
      students_email: formData.get("students_email"),
    }
});

  redirect(session.url);
}
