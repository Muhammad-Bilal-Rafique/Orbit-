import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { sendOrderEmail } from "@/lib/email";
import { sendLowStockAlertEmail } from "@/lib/lowStockEmailAlert";

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

      const fullSession = await stripe.checkout.sessions.retrieve(session.id);

      const shippingData =
        (fullSession as any).collected_information?.shipping_details || {};
      const shippingAddress = shippingData.address || {};
      const shippingName = shippingData.name || "Customer Name";

      const orderItems = (fullSession as any).metadata?.items
        ? JSON.parse((fullSession as any).metadata.items)
        : [];

      console.log("These are the order Items ", orderItems);

      const order = new Order({
        userId: (fullSession as any).metadata?.userId || "GUEST_USER",
        userEmail: (fullSession as any).metadata?.userEmail,
        items: orderItems,
        totalAmount: parseFloat(
          (fullSession as any).metadata?.totalAmount || "0",
        ),
        status: "pending",
        stripeSessionId: fullSession.id,
        shippingAddress: {
          fullName: shippingName,
          street: shippingAddress.line1 || "",
          city: shippingAddress.city || "",
          state: shippingAddress.state || "",
          zip: shippingAddress.postal_code || "",
          country: shippingAddress.country || "",
        },
      });

      await order.save();

      // await sendOrderEmail("confirmed", {
      //   email: (fullSession as any).metadata?.userEmail,
      //   orderId: order._id.toString(),
      //   totalAmount: order.totalAmount,
      //   items: orderItems,
      // });

      for (const item of orderItems) {
        const targetId = item.productId;

        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: targetId,
            variants: {
              $elemMatch: {
                "combination.Color": item.color,
                "combination.Size": item.size,
              },
            },
          },
          {
            $inc: { "variants.$[elem].stock": -item.quantity },
          },
          {
            arrayFilters: [
              {
                "elem.combination.Color": item.color,
                "elem.combination.Size": item.size,
              },
            ],
            new: true,
            select: { name: 1, variants: 1 },
          },
        );

        if (updatedProduct) {
          const plainVariants = JSON.parse(
            JSON.stringify(updatedProduct.variants),
          );

          const currentVariantNode = plainVariants.find((v: any) => {
            const color = v.combination?.Color;
            const size = v.combination?.Size;

            return color === item.color && size === item.size;
          });

          if (currentVariantNode && currentVariantNode.stock < 10) {
            await sendLowStockAlertEmail({
              productName: updatedProduct.name,
              variantColor: item.color,
              variantSize: item.size,
              currentStock: currentVariantNode.stock,
            });
          }
        } else {
          console.error(
            ` Inventory Mutation Mismatch Fail: Product ${targetId} array criteria not found in cluster.`,
          );
        }
      }
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
