import { Suspense } from "react";
import ProductDetailClient from "@/components/users-products/ProductDetailClient";
import ProductDetailSkeleton from "@/components/skeletons/product-detail-skeleton"; 
import { ProductTypes } from "@/types/ProductTypes";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

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
    description: product.description || `Explore ${product.name} on Orbit. High-end minimalist tech gear and luxury accessories.`};
}

const getSingleProduct = async (id: string): Promise<ProductTypes | null> => {
  try {
    await connectDb();
    const product = await Product.findById(id).lean();
    
    if (!product) return null;
    
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Direct Database query crashed for product id:", id, error);
    return null;
  }
};

async function ProductDetailFeed({ id }: { id: string }) {
  const product = await getSingleProduct(id);
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-destructive">Asset Synchronization Failure</h2>
        <p className="text-muted-foreground">The requested product inventory node does not exist or has been decommissioned.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="w-full">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailFeed id={id} />
      </Suspense>
    </div>
  );
}