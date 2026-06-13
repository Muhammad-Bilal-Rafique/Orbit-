import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { Product } from "@/models/Product";
import { connectDb } from "@/lib/connectDb";

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

    await connectDb();

    for (const item of items) {
      const targetId = item.productId;
      const dbProduct = await Product.findById(targetId);

      if (!dbProduct) {
        return NextResponse.json(
          { message: `Product "${item.name}" no longer exists in our store.` },
          { status: 400 },
        );
      }

     
      const matchingVariant = dbProduct.variants.find((v: any) => {
        const vColor =
          typeof v.combination.get === "function"
            ? v.combination.get("Color")
            : v.combination.Color;
        const vSize =
          typeof v.combination.get === "function"
            ? v.combination.get("Size")
            : v.combination.Size;

        return vColor === item.color && vSize === item.size;
      });

      if (!matchingVariant) {
        return NextResponse.json(
          {
            message: `The combination ${item.color} / ${item.size} for "${item.name}" is no longer available.`,
          },
          { status: 400 },
        );
      }

      if (matchingVariant.stock < item.quantity) {
        return NextResponse.json(
          {
            message: `Insufficient stock for "${item.name}" (${item.color} / ${item.size}). Only ${matchingVariant.stock} items left, but you have ${item.quantity} in your cart.`,
          },
          { status: 400 },
        );
      }
    }

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
