import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import { ProductTypes } from "@/types/ProductTypes";

export const getProducts = async (): Promise<ProductTypes[]> => {
  try {
    await connectDb();
    
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(" Direct Database fetch failed for products list:", error);
    return [];
  }
};