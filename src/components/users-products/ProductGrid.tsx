"use client";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { ProductTypes } from "@/types/ProductTypes";
import { MotionView, MotionItem } from "@/components/shared/motion-view";
import { AnimatePresence, motion } from "framer-motion";

interface ProductGridProps {
  products: ProductTypes[];
  totalProducts: number;
  onClearFilters: () => void;
  initialWishlistIds?: string[];
}

export default function ProductGrid({
  products,
  totalProducts,
  onClearFilters,
  initialWishlistIds = [],
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="lg:col-span-3 flex flex-col items-center justify-center py-16 px-4">
        {/* Dynamic fallback block when array length hits zero constraints */}
        <MotionView stagger={0.1} className="text-center flex flex-col items-center">
          <MotionItem>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No products found
            </h3>
          </MotionItem>
          <MotionItem>
            <p className="text-muted-foreground mb-6 text-sm font-medium">
              Try adjusting your filters or search query
            </p>
          </MotionItem>
          <MotionItem>
            <Button onClick={onClearFilters} variant="outline" className="rounded-full px-6 cursor-pointer">
              Clear all filters
            </Button>
          </MotionItem>
        </MotionView>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 overflow-hidden">
      <div className="mb-4 text-sm text-muted-foreground font-medium">
        Showing {products.length} of {totalProducts} products
      </div>

      <MotionView 
        stagger={0.06} 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => {
            const isInitiallyWishlisted: boolean = initialWishlistIds.includes(product._id);

            return (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <ProductCard 
                  {...product} 
                  isInitiallyWishlisted={isInitiallyWishlisted}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </MotionView>
    </div>
  );
}