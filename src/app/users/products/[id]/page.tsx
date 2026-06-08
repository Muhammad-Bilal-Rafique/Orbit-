import ProductDetailClient from "@/components/users-products/ProductDetailClient";
import { ProductTypes } from "@/types/ProductTypes";

interface Props {
  params: Promise<{ id: string }>;
}

const getProduct = async (id: string) => {
  try {
    console.log("Sending with ID:", id);
    const res = await fetch(
      `http://localhost:3000/api/user/getProductById/${id}`);

    if (!res.ok) throw new Error("Failed to fetch product");

    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};




export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product : ProductTypes = await getProduct(id);
  return <ProductDetailClient product={product} />;
}
