"use client";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { ProductTypes } from "@/types/ProductTypes";

interface ProductGridProps {
  products: ProductTypes[];
  totalProducts: number;
  onClearFilters: () => void;
}


export default function ProductGrid({
  products,
  totalProducts,
  onClearFilters,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="lg:col-span-3 flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search query
          </p>
          <Button onClick={onClearFilters} variant="outline">
            Clear all filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {products.length} of {totalProducts} products
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}