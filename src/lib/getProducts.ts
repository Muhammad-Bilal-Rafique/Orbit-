import { ProductTypes } from "@/types/ProductTypes";
export const getProducts = async (): Promise<ProductTypes[]> => {
  try {
    const res = await fetch('http://localhost:3000/api/user/getAllProducts')
    const data = await res.json()
    return data.products || []
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}