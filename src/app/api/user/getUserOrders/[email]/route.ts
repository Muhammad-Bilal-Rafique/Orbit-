import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";


interface RouteContext {
  params: Promise<{email: string;}>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // 1. Secure DB Connection
    await connectDb();

    // 2. Next.js 15 rules ke mutabik params ko await karna zaroori hai
    const { email } = await context.params;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Target validation failed: Email parameter vector is missing." },
        { status: 400 }
      );
    }

    // 3. Database query extraction with sorting (Newest first) aur lightweight optimization (.lean())
    const userOrders = await Order.find({ userEmail: email })
      .sort({ createdAt: -1 })
      .lean();

    // 4. Return Orders 
    return NextResponse.json(
      {
        success: true,
        message: "User transaction pipeline extracted successfully.",
        orders: userOrders,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Critical crash inside getUserOrders engine:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal framework exception occurred while pulling orders data stream.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}