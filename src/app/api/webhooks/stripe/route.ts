import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

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

      const shippingDetails = session.shipping_details || {};
      const shippingAddress = shippingDetails.address || {};

      const orderItems = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];

      const order = new Order({
        userId: session.metadata?.userId || "GUEST_USER", // Safe fallback shield
        userEmail: session.metadata?.userEmail,
        items: orderItems, // ✅ Reused parsed object clean stream
        totalAmount: parseFloat(session.metadata?.totalAmount || "0"),
        status: "processing",
        stripeSessionId: session.id,
        shippingAddress: {
          fullName: shippingDetails.name || "Customer Name",
          street: shippingAddress.line1 || "",
          city: shippingAddress.city || "",
          state: shippingAddress.state || "",
          zip: shippingAddress.postal_code || "",
          country: shippingAddress.country || "",
        },
      });

      // Save Order document to MongoDB Cluster
      await order.save();

      // 🔄 Atomic Inventory Sync Node Loop
      for (const item of orderItems) {
        const targetId = item.productId || item._id || item.id;
        
        await Product.findByIdAndUpdate(
          targetId,
          { 
            $inc: { stock: -item.quantity } 
          }
        );
      }
      
      console.log(`⚡ Inventory decremented and Order synced safely for: ${session.id}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook operation system crash:", error);
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 },
    );
  }
}