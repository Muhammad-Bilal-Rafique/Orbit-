import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = Number(searchParams.get("skip")) || 0;
    const limit = 8; 

    await connectDb();

    // Agle 8 products nikalain
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, products: [] }, { status: 500 });
  }
}