"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Info, ChevronLeft, Star } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { ProductTypes } from "@/types/ProductTypes";
import { MotionView, MotionItem } from "@/components/shared/motion-view";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailClientProps {
  product: ProductTypes;
  averageRating: string;
  totalReviews: number;
}

export default function ProductDetailClient({
  product,
  averageRating,
  totalReviews,
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

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground pb-12 pt-2 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROUTING ESCAPE BLOCK */}
        <Link
          href="/users/products"
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 group cursor-pointer"
        >
          <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />{" "}
          Back to Products
        </Link>

        {/* Global structured container layout for dual pane split screen info */}
        <MotionView
          stagger={0.12}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start w-full"
        >
          {/* LEFT: MASTER ASSET RENDER NODE */}
          <MotionItem className="w-full">
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
          </MotionItem>

          {/* RIGHT: DYNAMIC COMPONENT CONTEXT SPECIFICATIONS */}
          <div className="flex flex-col space-y-6 w-full">
            <MotionItem className="w-full">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {product.category}
                </p>
                
                <div className="flex flex-col justify-between sm:flex-row sm:items-baseline gap-x-4 gap-y-1">
                  <h1 className="text-3xl font-medium tracking-tight text-primary leading-tight">
                    {product.name}
                  </h1>
                  
                  {/* Rating Badge with Infinite Breathing Scale Loop */}
                  <div className="flex items-center space-x-2 shrink-0 select-none">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut"
                      }}
                      className="flex text-amber-500 items-center"
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.round(Number(averageRating)) ? "fill-amber-500" : "text-border/40"}`} 
                        />
                      ))}
                    </motion.div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {averageRating} <span className="text-[11px] font-medium opacity-60">({totalReviews})</span>
                    </span>
                  </div>
                </div>

                <p className="text-xl font-semibold text-primary pt-1">
                  ${currentPrice.toFixed(2)}
                </p>
              </div>
            </MotionItem>

            <MotionItem className="w-full">
              <hr className="border-border" />
            </MotionItem>

            <MotionItem className="w-full">
              <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                {product.description}
              </p>
            </MotionItem>

            {/* DYNAMIC INTERACTIVE CHOICES CHIPS GRID */}
            <div className="space-y-5 pt-2 w-full">
              {/* A. DYNAMIC COLOR SELECTOR TRACK */}
              {colorAttr && (
                <MotionItem className="w-full">
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
                          className={`px-4 py-2 border rounded-md text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
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
                </MotionItem>
              )}

              {/* B. DYNAMIC SIZE SELECTOR TRACK */}
              {sizeAttr && (
                <MotionItem className="w-full">
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
                          className={`w-12 h-10 border rounded-md text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
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
                </MotionItem>
              )}
            </div>

            {/* 🚨 S-RANK CRITICAL LOW STOCK NOTIFICATION STRATEGY */}
            <div className="w-full">
              <AnimatePresence initial={false}>
                {currentStock > 0 && currentStock <= 5 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.96 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 p-3 rounded-md w-full overflow-hidden"
                  >
                    <Info className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>
                      Low stock. Only {currentStock} items left in this size/color.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACTIONS FOOTER ANCHOR BLOCK */}
            <MotionItem className="w-full pt-4">
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
                className={`w-full h-12 text-xs uppercase font-medium tracking-widest transition-all hover:scale-[1.01] ${
                  currentStock > 0
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
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
            </MotionItem>

            {/* TAGS KEYWORDS DATA LOOP */}
            {product.keywords && product.keywords.length > 0 && (
              <MotionItem className="w-full">
                <div className="pt-6 border-t border-border">
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
              </MotionItem>
            )}
          </div>
        </MotionView>
      </div>
    </div>
  );
}