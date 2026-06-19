"use server";

import { connectDb } from "@/lib/connectDb";
import { Wishlist } from "@/models/Wishlist";
import { auth } from "@/auth";

export async function toggleWishlistAction(productId: string) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return { success: false, error: "Authentication required" };
    }

    await connectDb();
    const userId = session.user.email; // Using email as the unique identifier trace

    const existingDoc = await Wishlist.findOne({ userId, productId });

    if (existingDoc) {
      await Wishlist.deleteOne({ _id: existingDoc._id });
      return { success: true, action: "removed" };
    } else {
      await Wishlist.create({ userId, productId });
      return { success: true, action: "added" };
    }
  } catch (error) {
    return { success: false, error: "Internal server error execution lock" };
  }
}

export async function getActiveWishlistIdsAction() {
  try {
    const session = await auth();
    if (!session || !session.user?.email) return { success: true, ids: [] };

    await connectDb();
    const list = await Wishlist.find({ userId: session.user.email }).select("productId").lean();
    
    const ids = list.map(item => item.productId.toString());
    return { success: true, ids };
  } catch (error) {
    console.error("Failed to fetch telemetry ids:", error);
    return { success: false, ids: [] };
  }
}