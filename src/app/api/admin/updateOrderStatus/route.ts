import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order"; // Apne mongoose Order model ka path check kar lena

export async function PATCH(req: NextRequest) {
  try {
    // 1. Secure DB Connection
    await connectDb();

    // 2. Extract Data from request payload
    const body = await req.json();
    const { orderId, status } = body;

    // Validation Check
    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, message: "Missing parameter matrices: orderId or status state required." },
        { status: 400 }
      );
    }

    // 3. Find and Update the Order Document in MongoDB
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true } 
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Target order vector could not be extracted or located in DB." },
        { status: 404 }
      );
    }

    // 4. Return Absolute Success Signal
    return NextResponse.json({
      success: true,
      message: "Database telemetry status updated seamlessly.",
      order: updatedOrder,
    });

  } catch (error: any) {
    console.error("Critical internal error patching status state:", error);
    return NextResponse.json(
      { success: false, message: "Internal architecture crash during state mutation.", error: error.message },
      { status: 500 }
    );
  }
}