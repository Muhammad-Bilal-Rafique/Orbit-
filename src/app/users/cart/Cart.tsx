"use client";
import { useCartStore } from "@/lib/cartStore";
import CartItemComponent from "@/components/Cart/CartItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const total = getTotalPrice();
  const tax = total * 0.1; // 10% tax
  const shipping = total > 50 ? 0 : 10; // Free shipping over $50
  const grandTotal = total + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping to add items</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold text-muted-foreground">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={clearCart}
                className="text-sm text-destructive hover:underline"
              >
                Clear Cart
              </button>
            </div>

            <div>
              {items.map((item) => (
                <CartItemComponent
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
            <h2 className="text-lg font-semibold text-foreground mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">${grandTotal.toFixed(2)}</span>
            </div>

            <Link href="/users/checkout" className="w-full">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>

            <Link href="/products" className="block mt-3">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>

            {shipping > 0 && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                Free shipping on orders over $50
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}