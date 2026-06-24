"use client";

import { useCartStore } from "@/lib/cartStore";
import CartItemComponent from "@/components/Cart/CartItem";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";
import { AnimatePresence, motion } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  const total = getTotalPrice();
  const tax = total * 0.1;
  const shipping = total >= 50 || total === 0 ? 0 : 10;
  const grandTotal = total + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden">
        <MotionView
          stagger={0.1}
          className="max-w-md w-full mx-auto px-6 text-center flex flex-col items-center"
        >
          <MotionItem>
            <div className="w-20 h-20 rounded-full bg-secondary/50 border border-border/60 flex items-center justify-center mb-6 shadow-xs relative">
              <ShoppingCart
                className="w-8 h-8 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
          </MotionItem>

          <MotionItem>
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Your cart is empty
            </h1>
          </MotionItem>

          <MotionItem>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
              Explore our premium minimalist apparel drops to add items to your
              inventory space.
            </p>
          </MotionItem>

          <MotionItem className="w-full">
            <Button
              size="lg"
              className="w-full rounded-full font-semibold cursor-pointer tracking-wide hover:scale-105 transition-all duration-300"
            >
              <Link href="/users/products">Explore Products</Link>
            </Button>
          </MotionItem>
        </MotionView>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block Entry */}
        <MotionView stagger={0.08} className="w-full mb-10 md:mb-14">
          <MotionItem>
            <Link
              href="/users/products"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4 group cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Continue Shopping
            </Link>
          </MotionItem>
          <MotionItem>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Shopping Cart
            </h1>
          </MotionItem>
        </MotionView>

        {/* Master Interface Splitting Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start w-full">
          {/* LEFT: Cart Feed Manifest */}
          <div className="lg:col-span-2 space-y-4 w-full">
            <div className="flex justify-between items-center pb-4 border-b border-border/40">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Inventory space ({items.length} item
                {items.length !== 1 ? "s" : ""})
              </span>
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-destructive/80 hover:text-destructive hover:underline cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Space
              </button>
            </div>

            <MotionView stagger={0.06} className="w-full space-y-4 pt-2">
              <AnimatePresence mode="popLayout">
                {items.map((item) => {
                  const itemKey = `${item.productId}-${item.color}-${item.size}`;
                  return (
                    <motion.div
                      key={itemKey}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                        transition: { duration: 0.2 },
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full rounded-2xl border border-border/40 bg-card/60 p-4 shadow-xs hover:border-border/80 transition-colors duration-300"
                    >
                      <CartItemComponent
                        item={item}
                        onUpdateQuantity={(id, col, sz, q) =>
                          updateQuantity(id, col, sz, q)
                        }
                        onRemove={(id, col, sz) => removeItem(id, col, sz)}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </MotionView>
          </div>

          {/* RIGHT: Order Invoice Metrics Container */}
          <MotionView stagger={0.1} delayChildren={0.15} className="w-full">
            <MotionItem className="w-full">
              <div className="bg-card/40 border border-border/50 rounded-2xl p-6 lg:p-8 h-fit sticky top-24 shadow-xs backdrop-blur-xs">
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/90 mb-6 pb-4 border-b border-border/40">
                  Order Summary
                </h2>

                {/* Computational fee matrices */}
                <div className="space-y-4 mb-6 pb-6 border-b border-border/40 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground/80 font-medium">
                      Subtotal
                    </span>
                    <span className="text-foreground font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground/80 font-medium">
                      Tax (10%)
                    </span>
                    <span className="text-foreground font-semibold">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground/80 font-medium">
                      Shipping Fee
                    </span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-emerald-500 font-bold uppercase text-xs tracking-wider bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/10 rounded-full">
                          Free
                        </span>
                      ) : (
                        <span className="text-foreground">
                          ${shipping.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Progress indicator */}
                {shipping > 0 && (
                  <div className="mb-6 p-3 bg-secondary/30 border border-border/40 rounded-xl flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Truck
                      className="w-4 h-4 shrink-0 text-primary/70"
                      strokeWidth={1.5}
                    />
                    <span>
                      Add{" "}
                      <strong className="text-foreground">
                        ${(50 - total).toFixed(2)}
                      </strong>{" "}
                      more to unlock free delivery.
                    </span>
                  </div>
                )}

                {/* Grand Total Value Anchor Row */}
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-sm font-bold uppercase tracking-wider text-foreground/70">
                    Total Due
                  </span>
                  <span className="text-3xl font-black text-foreground tracking-tight">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Trigger Controls */}
                <div className="space-y-3 w-full flex flex-col">
                  {/*  Direct Link with buttonVariants */}
                  <Link
                    href="/users/checkout"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "w-full h-12 rounded-xl text-xs uppercase font-medium tracking-widest transition-all hover:scale-[1.01] cursor-pointer shadow-md shadow-primary/5 flex items-center justify-center",
                    })}
                  >
                    Proceed to Checkout
                  </Link>

                  {/*  Direct Link with outline variant */}
                  <Link
                    href="/users/products"
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className:
                        "w-full h-12 rounded-xl text-xs uppercase font-medium tracking-widest bg-background/50 hover:bg-muted cursor-pointer transition-colors flex items-center justify-center",
                    })}
                  >
                    Continue Browsing
                  </Link>
                </div>

                {/* Security Compliance Notice Badging */}
                <div className="mt-6 pt-5 border-t border-border/30 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/60 font-medium">
                  <ShieldCheck
                    className="w-4 h-4 text-emerald-500/80"
                    strokeWidth={1.5}
                  />
                  <span>Secure bank-grade end-to-end checkout encryption</span>
                </div>
              </div>
            </MotionItem>
          </MotionView>
        </div>
      </div>
    </div>
  );
}
