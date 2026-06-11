// /models/Order.ts
import mongoose, { Document, Schema } from "mongoose";

 interface IOrder extends Document {
  userId: string;
  userEmail: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status:
    | "cancelled"
    | "pending"
    | "processing"
    | "shipped"
    | "delivered";
  stripeSessionId: string;
    shippingAddress: {
      fullName: string;
      street: string;
      city: String;
      state: string;
      zip: string;
      country: string;
    },
    isReviewed: boolean,
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
      enum: ["pending", "processing", "shipped", "delivered","cancelled"],
      default: "pending",
    },
      shippingAddress: {
        fullName: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    stripeSessionId: { type: String, required: true },
    isReviewed:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true },
);

export const Order =
  mongoose.models.orders || mongoose.model<IOrder>("orders", OrderSchema);
