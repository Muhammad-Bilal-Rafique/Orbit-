
"use server";

import { connectDb } from "@/lib/connectDb";
import mongoose from "mongoose";
import {Review} from "@/models/Review"

export async function getProductReviewsAction(productId: string) {
  try {
    await connectDb();

    const reviews = await Review.find({ 
      productId: new mongoose.Types.ObjectId(productId) 
    })
    .populate({
      path: "userId",
      select: "name email", 
    })
    .sort({ createdAt: -1 })
    .lean();

    return { 
      success: true, 
      reviews: JSON.parse(JSON.stringify(reviews)) 
    };
  } catch (error) {
    return { success: false, error: "Failed to load database reviews context." };
  }
}