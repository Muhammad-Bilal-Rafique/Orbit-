"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Info, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { ProductTypes } from "@/types/ProductTypes";

interface ProductDetailClientProps {
  product: ProductTypes;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const addToCart = useCartStore((state) => state.addItem);

  // 1. EXTRACT ARCHITECTURAL FIELDS
  const colorAttr = product.attributes?.find((a) => a.name === "Color");
  const sizeAttr = product.attributes?.find((a) => a.name === "Size");

  // 2. STATES TRACKING NODE (Default to the very first index choices)
  const [selectedColor, setSelectedColor] = useState<string>(
    colorAttr?.values[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    sizeAttr?.values[0] || "",
  );

  // 3. DYNAMIC VARIANT MATCH INTERCEPTOR ENGINE
  const activeVariant = useMemo(() => {
    if (!product.variants) return null;
    return product.variants.find(
      (v) =>
        v.combination.Color === selectedColor &&
        v.combination.Size === selectedSize,
    );
  }, [selectedColor, selectedSize, product.variants]);

  // Pricing & Stock assignment parameters based on choice alignment
  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const currentStock = activeVariant ? activeVariant.stock : 0;

  // Total sum of all combinations for structural configuration tracking
  const totalCombinedStock =
    product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROUTING ESCAPE BLOCK */}
        <Link
          href="/users/products"
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />{" "}
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: MASTER ASSET RENDER NODE */}
          <div className="border border-border bg-card p-2 rounded-lg shadow-sm">
            <div className="relative w-full aspect-square bg-secondary rounded-md overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* RIGHT: DYNAMIC COMPONENT CONTEXT SPECIFICATIONS */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {product.category}
              </p>
              <h1 className="text-3xl font-medium tracking-tight text-primary leading-tight">
                {product.name}
              </h1>
              <p className="text-xl font-semibold text-primary">
                ${currentPrice.toFixed(2)}
              </p>
            </div>

            <hr className="border-border" />

            <p className="text-sm text-muted-foreground leading-relaxed font-normal">
              {product.description}
            </p>

            {/* DYNAMIC INTERACTIVE CHOICES CHIPS GRID */}
            <div className="space-y-5 pt-2">
              {/* A. DYNAMIC COLOR SELECTOR TRACK */}
              {colorAttr && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Color variant</span>
                    <span className="text-primary normal-case font-medium">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colorAttr.values.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-md text-xs font-medium uppercase tracking-wider transition-all ${
                          selectedColor === color
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* B. DYNAMIC SIZE SELECTOR TRACK */}
              {sizeAttr && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Size dimensions</span>
                    <span className="text-primary normal-case font-medium">
                      {selectedSize}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizeAttr.values.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-10 border rounded-md text-xs font-medium uppercase tracking-wider transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 🚨 S-RANK CRITICAL LOW STOCK NOTIFICATION STRATEGY */}
            {currentStock > 0 && currentStock <= 5 && (
              <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-500/5 border border-amber-500/15 p-3 rounded-md animate-in fade-in duration-200">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Low stock. Only {currentStock} items left in this size/color.
                </span>
              </div>
            )}

            {/* ACTIONS FOOTER ANCHOR BLOCK */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={() =>
                  addToCart({
                    productId: product._id,
                    name: product.name,
                    price: currentPrice,
                    imageUrl: product.imageUrl,
                    color: selectedColor,
                    size: selectedSize,
                  } as any)
                }
                size="lg"
                className={`w-full h-12 text-xs uppercase font-medium tracking-widest transition-colors ${
                  currentStock > 0
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-muted-foreground border border-border cursor-not-allowed"
                }`}
                disabled={currentStock === 0}
              >
                {currentStock > 0 ? (
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </span>
                ) : (
                  "Out of Size Stock"
                )}
              </Button>
            </div>

            {/* TAGS KEYWORDS DATA LOOP */}
            {product.keywords && product.keywords.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Tags / Style Notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="bg-secondary text-muted-foreground px-3 py-1 rounded-full text-xs border border-border/40 font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
