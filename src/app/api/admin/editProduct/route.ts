import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";

export async function PUT(request: NextRequest) {
  try {
    const {
      _id,
      name,
      description,
      price,
      stock,
      category,
      keywords,
      isFeatured,
    } = await request.json();
    await connectDb();
    const product = await Product.findById(_id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.keywords = keywords;
    product.isFeatured = isFeatured;
    await product.save();
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
