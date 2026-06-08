import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { message: "Missing stripe signature" },
        { status: 400 },
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      return NextResponse.json(
        { message: "Webhook signature verification failed" },
        { status: 400 },
      );
    }

if (event.type === "checkout.session.completed") {
  const session = event.data.object as any;

  await connectDb();

  // Shipping is in collected_information
  const shippingDetails = session.collected_information?.shipping_details || {};
  const shippingAddress = shippingDetails.address || {};

  const order = new Order({
    userId: session.metadata?.userId,
    userEmail: session.metadata?.userEmail,
    items: session.metadata?.items
      ? JSON.parse(session.metadata.items)
      : [],
    totalAmount: parseFloat(session.metadata?.totalAmount || "0"),
    status: "paid",
    stripeSessionId: session.id,
    shippingAddress: {
      fullName: shippingDetails.name,
      street: shippingAddress.line1,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.postal_code,
      country: shippingAddress.country,
    },
  });

  await order.save();
}

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
