"use client";
import Image from "next/image";
import Link from "next/link";
import { ProductTypes } from "@/types/ProductTypes";

type ProductCardProps = Pick<
  ProductTypes,
  "_id" | "name" | "category" | "price" | "imageUrl" | "variants"
>;

export default function ProductCard({
  _id,
  name,
  category,
  price,
  imageUrl,
  variants = [],
}: ProductCardProps) {
  const totalCombinedStock = variants.reduce(
    (sum, variant) => sum + (variant.stock || 0),
    0,
  );

  if (variants.length > 0 && totalCombinedStock === 0) {
    return null;
  }

  return (
    <Link href={`/users/products/${_id}`} className="group block">
      <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300">
        {/* ASSET ELEMENT MEDIA FRAME */}
        <div className="relative w-full aspect-square bg-secondary overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500  "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
        </div>

        {/* DETAILS CONTROLLER FLOW */}
        <div className="p-4 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {category}
          </p>

          <h3 className="font-medium text-foreground tracking-tight line-clamp-1 mb-1 text-sm group-hover:text-primary transition-colors">
            {name}
          </h3>

          <div className="flex items-center justify-between pt-1 border-t border-secondary mt-2">
            {/* STARK RETAIL PRICING LABELS */}
            <span className="text-sm font-semibold text-foreground">
              ${price.toFixed(2)}
            </span>
          </div>

          <div className="h-6 flex items-center">
            {totalCombinedStock <= 10 ? (
              <span className="text-[9px] uppercase tracking-widest font-bold text-amber-600 bg-amber-500/5 px-2 py-1 rounded-sm border border-amber-500/15 animate-pulse">
                A Few Remaining
              </span>
            ) : (
              <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground/60 bg-secondary/40 px-2 py-1 rounded-sm border border-border/40">
                Core Collection
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
