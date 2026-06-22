import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"
import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import { User } from "@/models/User";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // 1. Secure API Thread Layer Verification
     const session = await auth();
    
    console.log("Session:", session);
    console.log("User role:", session?.user?.role);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDb();
    const user = await User.findOne({ email: session.user.email });

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Extract Multivariant JSON Tree Structure Payload
    const body = await request.json();
    const {
      name,
      description,
      price,
      category,
      keywords,
      isFeatured,
      imageUrl,
      attributes,
      variants,
    } = body;

    if (!name || !description || !price || !imageUrl || !category) {
      return NextResponse.json(
        {
          message:
            "Required core primitive parameters missing from matrix payload.",
        },
        { status: 400 },
      );
    }

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "orbit_products",
      resource_type: "auto",
      quality: "auto",
      format: "webp",
    });

    const sanitizedKeywords =
      typeof keywords === "string"
        ? keywords
            .split(",")
            .map((k: string) => k.trim())
            .filter(Boolean)
        : keywords;

    const product = new Product({
      name,
      description,
      price: Number(price),
      category,
      isFeatured: Boolean(isFeatured),
      keywords: sanitizedKeywords,
      imageUrl: uploadResult.secure_url,
      attributes,
      variants,
    });

    await product.save();
    return NextResponse.json(
      {
        message: "Product architecture created securely inside clusters",
        product,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Product execution route crash details:", error);
    return NextResponse.json(
      {
        message: "Failed to compile product entry node workflow.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
