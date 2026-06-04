"use client";
import { useState, useMemo } from "react";
import FilterSidebar, { PRICE_RANGES } from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import {ProductTypes} from "@/types/ProductTypes"

export default function ProductsClient({products}: {products: ProductTypes[]}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

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
        product.keywords.some((k) => k.toLowerCase().includes(query));

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory, selectedPriceRange]);

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

      <div className="max-w-7xl mx-auto px-4 py-8">
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

          <ProductGrid
            products={filteredProducts}
            totalProducts={products.length}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
}