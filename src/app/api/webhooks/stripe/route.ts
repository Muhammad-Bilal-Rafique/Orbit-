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
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      return NextResponse.json(
        { message: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      await connectDb();

      const order = new Order({
        userId: session.metadata?.userId,
        userEmail: session.metadata?.userEmail,
        items: session.metadata?.items
          ? JSON.parse(session.metadata.items)
          : [],
        totalAmount: (session.amount_total || 0) / 100,
        status: "processing",
        stripeSessionId: session.id,
      });

      await order.save();
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 }
    );
  }
}