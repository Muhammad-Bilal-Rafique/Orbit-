import { cache } from "react"; 
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/users-products/ProductDetailClient";
import { ProductTypes } from "@/types/ProductTypes";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

const getSingleProduct = cache(async (id: string): Promise<ProductTypes | null> => {
  try {
    await connectDb();
    const product = await Product.findById(id).lean();
    
    if (!product) return null;
    
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Direct Database query crashed for product id:", id, error);
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | Orbit",
      description: "The requested premium item could not be found in our catalog.",
    };
  }

  return {
    title: `${product.name} | Orbit`,
    description: product.description || `Explore ${product.name} on Orbit. High-end minimalist tech gear and luxury accessories.`,
  };
}


export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  
  // Direct synchronized fetch
  const product = await getSingleProduct(id); 
  
  if (!product) {
    notFound(); 
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <ProductDetailClient product={product} />
    </div>
  );
}