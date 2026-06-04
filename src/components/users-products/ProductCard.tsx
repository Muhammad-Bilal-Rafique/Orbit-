"use client";
import Image from "next/image";
import Link from "next/link";
import {ProductTypes} from "@/types/ProductTypes";

type ProductCardProps = Pick<ProductTypes , "_id" | "name" | "category" | "price" | "imageUrl" | "stock">;

export default function ProductCard({
  _id,
  name,
  category,
  price,
  imageUrl,
  stock,
}: ProductCardProps) {
  return (
    <Link href={`/users/products/${_id}`} className="group">
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full aspect-square bg-secondary overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {stock <= 10 && stock > 0 && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
              Low Stock
            </div>
          )}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
            {category}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            <span
              className={`text-xs font-medium ${
                stock > 0 ? "text-green-600" : "text-destructive"
              }`}
            >
              {stock > 0 ? `${stock} left` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}