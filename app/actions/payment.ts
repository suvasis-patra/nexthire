"use server";

import { z } from "zod";
import Stripe from "stripe";

import { JobpostSchema } from "@/validation/job-post";

export async function makePayment(
  jobPost: z.infer<typeof JobpostSchema>,
  jobPostId: string
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 25000,
          product_data: {
            name: jobPost.companyName,
            description: `Posting a job for ${jobPost.position} role`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobPostId,
    },
    mode: "payment",
    success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/hire-remotely?payment=failed",
  });

  return session?.url!;
}
