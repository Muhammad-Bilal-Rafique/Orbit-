import AddProduct from "./AddProduct";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | Orbit",
  description: "Add a new premium product to our exclusive catalog.",
};

export default function AddProductPage() {
  return <AddProduct />;
}