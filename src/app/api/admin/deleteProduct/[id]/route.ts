// /api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import { getToken } from "next-auth/jwt";
import { User } from "@/models/User";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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
    const { id } = await params;
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 },
    );
  }
}
