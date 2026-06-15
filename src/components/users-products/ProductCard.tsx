"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductTypes } from "@/types/ProductTypes";
import { Heart } from "lucide-react";
import { toggleWishlistAction } from "@/app/actions/wishlist";

type ProductCardProps = Pick<
  ProductTypes,
  "_id" | "name" | "category" | "price" | "imageUrl" | "variants"
> & {
  isInitiallyWishlisted: boolean; 
};

export default function ProductCard({
  _id,
  name,
  category,
  price,
  imageUrl,
  variants = [],
  isInitiallyWishlisted,
}: ProductCardProps) {
  const totalCombinedStock = variants.reduce(
    (sum, variant) => sum + (variant.stock || 0),
    0,
  );

  if (variants.length > 0 && totalCombinedStock === 0) {
    return null;
  }

  const [addInList, setaddInList] = useState<boolean>(isInitiallyWishlisted);

  useEffect(() => {
    setaddInList(isInitiallyWishlisted);
  }, [isInitiallyWishlisted]);

  const handleWishlistToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const previousState = addInList;
    setaddInList(!addInList);

    try {
      const res = await toggleWishlistAction(productId);

      if (!res.success) {
        setaddInList(previousState);
        alert(res.error || "Failed to update wishlist");
      }
    } catch (error) {
      console.error("Wishlist sync error:", error);
      setaddInList(previousState);
    }
  };

  return (
    <Link href={`/users/products/${_id}`} className="group block relative">
      <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 relative">
        {/* ASSET ELEMENT MEDIA FRAME */}
        <div className="relative w-full aspect-square bg-secondary overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />

          {/* WISHLIST HEART BUTTON BUTTON */}
          <button
            type="button"
            onClick={(e) => handleWishlistToggle(e, _id)}
            className={`cursor-pointer absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shadow-xs
            ${
              addInList
                ? "bg-rose-500 border-rose-500 text-white md:opacity-100 md:scale-100"
                : "bg-white/95 border-border text-muted-foreground/80 hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart
              className={`w-4 h-4 active:scale-75 transition-all duration-200 ${
                addInList ? "fill-white stroke-white" : "stroke-2"
              }`}
            />
          </button>
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