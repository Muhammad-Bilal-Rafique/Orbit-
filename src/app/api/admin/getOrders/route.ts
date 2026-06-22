import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";
import { auth } from "@/auth"
import { User } from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    // 1. Secure Shield Admin Check Layer
    const session = await auth();

    console.log("Session:", session);
    console.log("User role:", session?.user?.role);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDb();
    const user = await User.findOne({ email: session.user.email });

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
