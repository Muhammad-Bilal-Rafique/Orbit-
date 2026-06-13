import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";
import { sendOrderEmail } from "@/lib/email";

export async function PATCH(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing parameter matrices: orderId or status state required.",
        },
        { status: 400 },
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { returnDocument: "after" },
    );

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Target order vector could not be extracted or located in DB.",
        },
        { status: 404 },
      );
    }

    console.log("status updated to:", status);

    if (status === "delivered") {
      await sendOrderEmail("recieved", {
        email: updatedOrder.userEmail,
        orderId: updatedOrder._id.toString(),
        totalAmount: updatedOrder.totalAmount,
        items: updatedOrder.items,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database telemetry status updated seamlessly.",
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("Critical internal error patching status state:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal architecture crash during state mutation.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
