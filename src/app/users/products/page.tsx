import ProductsClient from "@/components/users-products/ProductsClient";
import { ProductTypes } from "@/types/ProductTypes";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import type { Metadata } from "next";
import { getActiveWishlistIdsAction } from "@/app/actions/wishlist";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

export const metadata: Metadata = {
  title: "Premium Catalog | Orbit",
  description: "Browse our entire ecosystem of minimalist clothing drops. Filter through elite apparel essentials.",
};

const getInitialProducts = async (): Promise<ProductTypes[]> => {
  try {
    await connectDb();
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(8).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
};

export default async function ProductsPage() {
  const initialProducts = await getInitialProducts();
  const wishlistRes = await getActiveWishlistIdsAction();
  const wishlistIds = wishlistRes.success ? wishlistRes.ids : [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6 overflow-hidden">
      <MotionView stagger={0.1}>
        <MotionItem>
          <div className="space-y-1.5">
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Marketplace Catalog
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Browse through our premium curated high-end asset lineup. Use the sidebar config to query parameters.
            </p>
          </div>
        </MotionItem>

        <MotionItem>
          <hr className="border-border/60" />
        </MotionItem>

        <MotionItem className="pt-2">
          {/* Initial products passed safely down */}
          <ProductsClient initialProducts={initialProducts} initialWishlistIds={wishlistIds} />
        </MotionItem>
      </MotionView>
    </div>
  );
}