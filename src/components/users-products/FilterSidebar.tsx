"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200+", min: 200, max: Infinity },
];

interface FilterSidebarProps {
  categories: string[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriceRange: number;
  onPriceRangeChange: (index: number) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function FilterSidebar({
  categories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  onClearFilters,
  hasActiveFilters,
}: FilterSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-4 space-y-6">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">
            Price
          </label>
          <div className="space-y-2">
            {PRICE_RANGES.map((range, idx) => (
              <button
                key={idx}
                onClick={() => onPriceRangeChange(idx)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedPriceRange === idx
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}

export { PRICE_RANGES };