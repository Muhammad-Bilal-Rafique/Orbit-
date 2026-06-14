import { ProductTypes } from "@/types/ProductTypes"
import ProductsList from "@/components/admin/inventory/productsList"
import { getProducts } from "@/lib/getProducts"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory | Orbit",
  description: "Manage your inventory and product catalog.",
};


export default async function page() {
  const Products: ProductTypes[] = await getProducts();
  return (
    <ProductsList Products={Products}/>
  );
}