import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/users-products/ProductDetailClient";
import { ProductTypes } from "@/types/ProductTypes";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import type { Metadata } from "next";
import Reviews from "@/components/users-products/Reviews";
import { Review } from "@/models/Review"; 

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

const getSingleProduct = (async (id: string): Promise<ProductTypes | null> => {
  try {
    await connectDb();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    return null;
  }
});
const getProductReviews = async (productId: string) => {
  try {
    await connectDb();
    const reviews = await Review.find({ productId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    return [];
  }
};

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
    description: product.description || `Explore ${product.name} on Orbit. High-end minimalist clothing Essentials.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  
  const product = await getSingleProduct(id); 
  if (!product) notFound(); 

  const reviews = await getProductReviews(id);

  const totalReviews = reviews.length;
  const averageRating = totalReviews 
    ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  return (
    <div className="w-full min-h-screen bg-background">
      <ProductDetailClient 
        product={product} 
        averageRating={averageRating}
        totalReviews={totalReviews}
      />
      <Reviews 
        productId={id} 
        initialReviews={reviews}
        averageRating={averageRating}
        totalReviews={totalReviews}
        aiSummaryFromDb={product.aiSummary} 
      />
    </div>
  );
}