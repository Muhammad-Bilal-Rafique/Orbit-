"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import {ProductTypes} from "@/types/ProductTypes";

interface ProductDetailClientProps {
  product: ProductTypes;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {

  const addToCart = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product not found
          </h1>
          <Link href="/users/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/users/products"
          className="text-primary hover:underline mb-6 inline-block"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-secondary rounded-lg overflow-hidden">
            <div className="relative w-full aspect-square">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-2">
              {product.category.toUpperCase()}
            </p>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-foreground mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-destructive font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() =>
                  addToCart({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                  })
                }
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Keywords */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm font-semibold text-foreground mb-3">
                Tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-secondary text-foreground px-3 py-1 rounded-full text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
