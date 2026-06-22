import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";
import { getToken } from "next-auth/jwt";
import { User } from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    // 1. Secure Shield Admin Check Layer
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized asset modification layout." },
        { status: 401 },
      );
    }
    await connectDb();
    const user = await User.findOne({ email: token.email });

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
