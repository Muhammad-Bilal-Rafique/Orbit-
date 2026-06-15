import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  userId: string;
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WishlistSchema: Schema = new Schema({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound Index to prevent duplicate database leakage entries
//only allow unique combinations of product id and user id
WishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const Wishlist = mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);