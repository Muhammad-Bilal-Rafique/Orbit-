import mongoose, { Document, Schema } from "mongoose";

// 1. TypeScript Types Update
 interface ReviewType extends Document {
  userId: mongoose.Types.ObjectId; 
  productId: mongoose.Types.ObjectId;
  orderId:mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

// 2. Mongoose Schema Configuration
const ReviewSchema = new Schema<ReviewType>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User_accounts",
      required: true 
    },
    productId: { 
      type: Schema.Types.ObjectId, 
      ref: "Products",
      required: true
    },
    orderId: { 
      type: Schema.Types.ObjectId, 
      ref: "orders",
      required: true
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { 
    timestamps: true
  }
);

export const Review = mongoose.models.Reviews || mongoose.model<ReviewType>("Reviews", ReviewSchema);