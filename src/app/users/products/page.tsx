import ProductsClient from "@/components/users-products/ProductsClient";
import { ProductTypes } from "@/types/ProductTypes";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import type { Metadata } from "next";
import { getActiveWishlistIdsAction } from "@/app/actions/wishlist";

export const metadata: Metadata = {
  title: "Premium Catalog | Orbit",
  description: "Browse our entire ecosystem of minimalist engineering items and luxury tech gear. Filter through elite performance hardware.",
};

const getProducts = async (): Promise<ProductTypes[]> => {
  try {
    await connectDb();
    const products = await Product.find({}).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products inside server matrix:", error);
    return [];
  }
};

export default async function ProductsPage() {
  const products = await getProducts();
  const wishlistRes = await getActiveWishlistIdsAction();
  const wishlistIds = wishlistRes.success ? wishlistRes.ids : [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Marketplace Catalog
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Browse through our premium curated high-end asset lineup. Use the sidebar config to query parameters.
        </p>
      </div>

      <hr className="border-border/60" />

      <ProductsClient products={products} initialWishlistIds={wishlistIds} />
    </div>
  );
}