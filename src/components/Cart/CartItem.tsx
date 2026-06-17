// /components/cart/CartItemComponent.tsx
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/lib/cartStore";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  onRemove: (productId: string, color: string, size: string) => void;
}

export default function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <div className="relative w-20 h-20 bg-secondary rounded-xl overflow-hidden shrink-0 border border-border/40">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="80px"
          priority
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <p className="text-muted-foreground text-sm">
          ${item.price.toFixed(2)}
        </p>

        <div>
          <p className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded inline-block mt-1">
            {item.color} / {item.size}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            // 🚀 Passing item.color and item.size
            onClick={() => onUpdateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              onUpdateQuantity(item.productId, item.color, item.size, parseInt(e.target.value) || 1)
            }
            className="w-12 text-center h-8"
            min="1"
          />
          <Button
            variant="outline"
            size="sm"
            // 🚀 Passing item.color and item.size
            onClick={() => onUpdateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="text-right flex flex-col justify-between">
        <p className="font-bold text-foreground">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.productId, item.color, item.size)}
          className="text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}