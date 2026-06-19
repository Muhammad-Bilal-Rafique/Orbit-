"use client";

import { useState, useMemo } from "react";
import FilterSidebar, { PRICE_RANGES } from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import { ProductTypes } from "@/types/ProductTypes";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ProductsClient({
  initialProducts,
  initialWishlistIds = []
}: {
  initialProducts: ProductTypes[];
  initialWishlistIds?: string[];
}) {
  const [products, setProducts] = useState<ProductTypes[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length === 8);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const categories = useMemo(() => {
    return ["All", ...new Set(initialProducts.map((p) => p.category))];
  }, [initialProducts]);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const currentLength = products.length;
      const res = await axios.get(`/api/user/load-more?skip=${currentLength}`);

      if (res.data.success) {
        const newProducts = res.data.products;

        if (newProducts.length < 8) {
          setHasMore(false);
        }

        setProducts((prev) => [...prev, ...newProducts]);
      }
    } catch (error) {
      toast.error("Failed to load more products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;

      const priceRange = PRICE_RANGES[selectedPriceRange];
      const priceMatch =
        product.price >= priceRange.min && product.price <= priceRange.max;

      const query = searchQuery.toLowerCase();
      const searchMatch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.keywords && product.keywords.some((k) => k.toLowerCase().includes(query)));

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [products, searchQuery, selectedCategory, selectedPriceRange]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedPriceRange(0);
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedCategory !== "All" || selectedPriceRange !== 0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
          <p className="text-muted-foreground">
            Explore our collection of {products.length} items
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <FilterSidebar
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="lg:col-span-3 space-y-8">
            <ProductGrid
              products={filteredProducts}
              totalProducts={products.length}
              onClearFilters={handleClearFilters}
              initialWishlistIds={initialWishlistIds}
            />

            {hasMore && !hasActiveFilters && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleLoadMore}
                  disabled={loading}
                  variant="outline"
                  className="h-11 px-8 rounded-md text-xs uppercase font-bold tracking-widest active:scale-[0.99] transition-all min-w-[160px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}