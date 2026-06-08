// /models/Order.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  userEmail: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  stripeSessionId: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    stripeSessionId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("orders", OrderSchema);