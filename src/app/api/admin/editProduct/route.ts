import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";

export async function PUT(request: NextRequest) {
  try {
    // 1. Secure Shield Admin Check Layer
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized access path." },
        { status: 401 }
      );
    }

    // 2. Extract Data Tree
    const body = await request.json();
    const { _id, name, description, price, category, keywords, isFeatured, variants } = body;

    if (!_id || !name || !description || !price || !category) {
      return NextResponse.json(
        { message: "Required operational primitive constraints missing." },
        { status: 400 }
      );
    }

    await connectDb();

    // 3. Atomically Update Full Document Structure
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          description,
          price: Number(price),
          category,
          keywords, 
          isFeatured: Boolean(isFeatured),
          variants, 
        },
      },
      { returnDocument: "after", runValidators: true } 
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product asset target matching id not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inventory matrix sync node updated successfully.",
        product: updatedProduct,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Edit product pipeline processing crash trace:", error);
    return NextResponse.json(
      { message: "Failed to resolve product data mutation matrix.", error: error.message },
      { status: 500 }
    );
  }
}