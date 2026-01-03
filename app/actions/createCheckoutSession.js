"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function createCheckoutSession(formData) {
  const classId = formData.get("classId");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Yoga class",
          },
          unit_amount: 800, // £8
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${classId}`,
    metadata: {
      classId,
    },
  });

  redirect(session.url);
}
