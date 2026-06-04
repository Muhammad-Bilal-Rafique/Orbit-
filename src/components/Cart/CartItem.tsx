"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/lib/cartStore";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-border">
      {/* Image */}
      <div className="relative w-20 h-20 bg-secondary rounded overflow-hidden flex-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.productId, parseInt(e.target.value) || 1)}
            className="w-12 text-center h-8"
            min="1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
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
          onClick={() => onRemove(item.productId)}
          className="text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}