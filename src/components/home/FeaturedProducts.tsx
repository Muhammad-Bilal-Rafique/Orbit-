import ProductCard from "@/components/users-products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductTypes } from "@/types/ProductTypes";
import { connectDb } from "@/lib/connectDb";
import { Product } from "@/models/Product";

const getFeaturedProducts = async (): Promise<ProductTypes[]> => {
  try {
    await connectDb();
    const products = await Product.find({ isFeatured: true }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Direct DB fetch error on homepage featured feed:", error);
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
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">Trending items this season</p>
          </div>
          <Link href="/users/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product: ProductTypes) => {
            const isInitiallyWishlisted: boolean = initialWishlistIds.includes(
              product._id,
            );

            return (
              <ProductCard
                key={product._id}
                {...product}
                isInitiallyWishlisted={isInitiallyWishlisted}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
