import mongoose, { Document, Schema } from "mongoose";

interface IAttribute {
  name: string;   
  values: string[]; 
}

interface IVariant {
  combination: Map<string, string>; // i.e { Color: 'red', Size: 'M' }
  price: number;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number; 
  imageUrl: string;
  category: string;
  keywords: string[];
  isFeatured: boolean;
  attributes: IAttribute[];
  variants: IVariant[];
}


const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    keywords: { type: [String], required: true },
    isFeatured: { type: Boolean, default: false },
    
    attributes: [
      {
        name: { type: String, required: true },
        values: { type: [String], required: true },
      },
    ],
    
    variants: [
      {
        combination: { type: Map, of: String, required: true }, 
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Products || mongoose.model<IProduct>("Products", ProductSchema);