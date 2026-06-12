"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartStore, CartItem } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react"; 
import axios from "axios";

interface CreateSessionResponse {
  url: string;
}

interface TotalBreakdown {
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

export default function CheckoutPage(): React.ReactNode {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, getTotalPrice , clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stockError, setStockError] = useState<string | null>(null); 

  const calculateTotals = (): TotalBreakdown => {
    const subtotal = getTotalPrice();
    const tax = subtotal * 0.1;
    const shipping = subtotal > 50 ? 0 : 10;
    const grandTotal = subtotal + tax + shipping;
    return { subtotal, tax, shipping, grandTotal };
  };

  const handleCheckout = async (): Promise<void> => {
    setIsLoading(true);
    setStockError(null); // Clear previous errors
    
    try {
      const { grandTotal } = calculateTotals();

      // Send payload directly to validation pipeline
      const response = await axios.post<CreateSessionResponse>(
        "/api/checkout/create-session",
        {
          items,
          totalAmount: grandTotal,
          successUrl: `${window.location.origin}/users/order-success`,
          cancelUrl: `${window.location.origin}/users/checkout`,
        }
      );
      clearCart();
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      
      //  INTERCEPT STOCK OUT ERRORS FROM BACKEND
      if (axios.isAxiosError(error) && error.response) {
        const backendMessage = error.response.data?.message || "Checkout failed.";
        setStockError(backendMessage);
      } else {
        setStockError("An unexpected system exception occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Login Required</h1>
          <p className="text-muted-foreground mb-6">Please log in to proceed with checkout</p>
          <Button onClick={() => router.push("/auth/login")} size="lg">Go to Login</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some items before checking out</p>
          <Button onClick={() => router.push("/products")} size="lg">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const { subtotal, tax, shipping, grandTotal } = calculateTotals();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
            
            {/* STOCK WARNING ALERTER */}
            {stockError && (
              <div className="mb-6 p-4 border border-destructive/40 bg-destructive/5 text-destructive rounded-lg text-sm font-semibold tracking-wide">
                ⚠️ {stockError}
              </div>
            )}

            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center py-4 border-b border-border last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-4">
            <h2 className="text-lg font-semibold text-foreground mb-6">Order Total</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">${grandTotal.toFixed(2)}</span>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full mb-3"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Inventory...
                </>
              ) : (
                "Pay with Stripe"
              )}
            </Button>

            <Button
              onClick={() => router.push("/products")}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Continue Shopping
            </Button>

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