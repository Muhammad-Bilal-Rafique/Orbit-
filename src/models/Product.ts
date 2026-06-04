import mongoose , {Document , Schema} from "mongoose";

export interface IProduct extends Document {
name: string;
description: string;
price: number;
imageUrl: string;
category: string;
stock: number;
keywords: string[];
isFeatured: boolean;
}

const ProductSchema: Schema = new Schema(
{
name: { type: String, required: true },
description: { type: String, required: true },
price: { type: Number, required: true },
imageUrl: { type: String, required: true },
category: { type: String, required: true },
stock: { type: Number, required: true },
keywords: { type: [String], required: true },
isFeatured: { type: Boolean, default: false }
},
{ timestamps: true },
);

export const Product =
mongoose.models.Products || mongoose.model<IProduct>("Products", ProductSchema);