import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Check auth
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, description, price, stock, category, keywords, isFeatured, imageUrl } =
      await request.json();

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "orbit_products",
      resource_type: "auto",
    });

    // Connect to DB
    await connectDb();

    // Create product
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      keywords: keywords.split(",").map((k: string) => k.trim()),
      isFeatured,
      imageUrl: uploadResult.secure_url,
    });

    await product.save();

    return NextResponse.json(
      {
        message: "Product created",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}