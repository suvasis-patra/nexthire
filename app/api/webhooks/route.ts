import stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  const body = await request.text();
  console.log(body);

  const sig = request.headers.get("stripe-signature") as string;
  console.log(sig);
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  // TODO: handle the response from stripe and redirect accordingly
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endPointSecret);
  } catch (error) {
    return NextResponse.json({ message: "webhook error", err: error });
  }
  const eventType = event.type;
  // create
  if (eventType === "checkout.session.completed") {
    const { amount_total, id, metadata } = event.data.object;
    if (!session?.user?.id || !metadata?.jobPostId || amount_total === null) {
      console.error("Missing required fields for transaction creation");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    await db.jobPost.update({
      where: { id: metadata?.jobPostId },
      data: { paymentStatus: true },
    });

    const transaction = {
      userId: session?.user?.id,
      amount: amount_total,
      jobPostId: metadata?.jobPostId,
    };
    await db.transaction.create({ data: transaction });
  }
  return new Response("", { status: 200 });
}
