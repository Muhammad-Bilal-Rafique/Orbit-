import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email)
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );

    const { items, totalAmount, successUrl, cancelUrl } = await request.json();
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email,
        items: JSON.stringify(items),
        totalAmount: totalAmount.toString(),
      },
      shipping_address_collection: {
        allowed_countries: ["PK", "US", "IN"],
      },
      billing_address_collection: "auto",
    });
    return NextResponse.json({ url: checkoutSession.url }, { status: 200 });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { message: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
