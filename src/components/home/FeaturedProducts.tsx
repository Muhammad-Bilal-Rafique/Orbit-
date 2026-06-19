import ProductCard from "@/components/users-products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductTypes } from "@/types/ProductTypes";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

const getFeaturedProducts = async (): Promise<ProductTypes[]> => {
  try {
    await connectDb();
    const products = await Product.find({ isFeatured: true }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
};

export default async function FeaturedProducts({
  initialWishlistIds,
}: {
  initialWishlistIds: string[];
}) {
  const featured: ProductTypes[] = await getFeaturedProducts();

  return (
    <section className="bg-background py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main staggered animated content block */}
        <MotionView stagger={0.2}>
          
          {/* Section Header */}
          <MotionItem>
            <div className="flex items-center justify-between mb-12 w-full">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                  Featured Products
                </h2>
                <p className="text-muted-foreground text-sm font-medium">Trending items this season</p>
              </div>
              <Link href="/users/products">
                <Button variant="outline" className="rounded-full px-6 cursor-pointer hover:scale-105 transition-transform duration-300">
                  View All
                </Button>
              </Link>
            </div>
          </MotionItem>

          {/* Product Items Content Feed Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {featured.map((product: ProductTypes) => {
              const isInitiallyWishlisted: boolean = initialWishlistIds.includes(
                product._id,
              );

              return (
                <MotionItem key={product._id}>
                  <ProductCard
                    {...product}
                    isInitiallyWishlisted={isInitiallyWishlisted}
                  />
                </MotionItem>
              );
            })}
          </div>

        </MotionView>

      </div>
    </section>
  );
}