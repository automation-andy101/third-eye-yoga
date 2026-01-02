"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutButton({ classId }) {
    const handleCheckout = async () => {
        const res = await fetch("/api/create-checkout-session", {
            method: "POST",
            body: JSON.stringify({ classId }),
        });

        const { sessionId } = await res.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
    };

    return (
        <button onClick={handleCheckout}>
        Pay & Book
        </button>
    );
}
