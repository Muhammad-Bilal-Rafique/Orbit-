"use client";
import { mockProducts } from "@/lib/mockProducts";
import ProductCard from "@/components/users-products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturedProducts() {
  const featured = mockProducts.slice(0, 8);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Trending items this season</p>
          </div>
          <Link href="/users/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}