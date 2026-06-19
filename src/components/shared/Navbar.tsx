"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import UserNav from "./user-nav";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState<boolean>(false);
  const cartCount = useCartStore((state) => state.getTotalItems());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Expanded full container width for accommodating the clean link line stream */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-20 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-4">
        
        {/* Column 1: Left - Logo Alignment */}
        <div className="flex justify-start">
          <Link href="/" className="shrink-0" prefetch={true}>
            <div className="relative w-36 h-12 md:w-40 md:h-14">
              <Image
                src={Logo}
                alt="Orbit"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Column 2: Center - Continuous Metric S-Rank Link Stream (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-center gap-3 lg:gap-4 flex-wrap">
          <Link
            prefetch={true}
            href="/"
            className="group relative text-[11px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
          >
            Home
            <span className="absolute bottom-0 left-1/2 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </Link>
          
          <span className="text-muted-foreground/20 text-xs select-none">/</span>

          <Link
            prefetch={true}
            href="/users/products"
            className="group relative text-[11px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
          >
            Collections
            <span className="absolute bottom-0 left-1/2 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </Link>

          <span className="text-muted-foreground/20 text-xs select-none">/</span>

          <Link
            prefetch={true}
            href="/users/profile/wishlist"
            className="group relative text-[11px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
          >
            Wishlist
            <span className="absolute bottom-0 left-1/2 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </Link>

          <span className="text-muted-foreground/20 text-xs select-none">/</span>

          <Link
            prefetch={true}
            href="/users/profile/orders"
            className="group relative text-[11px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
          >
            Order Tracking
            <span className="absolute bottom-0 left-1/2 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </Link>

          <span className="text-muted-foreground/20 text-xs select-none">/</span>

          <Link
            prefetch={true}
            href="/users/about"
            className="group relative text-[11px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
          >
            About
            <span className="absolute bottom-0 left-1/2 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </Link>
        </div>

        {/* Column 3: Right - Action Controls Alignment */}
        <div className="flex items-center justify-end gap-5">
          {/* Shopping Cart Link */}
          <Link href="/users/cart" prefetch={true} className="relative p-1">
            <ShoppingCart className="w-5 h-5 text-foreground hover:text-foreground/80 transition-colors" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Status Auth Gate */}
          <div className="flex items-center">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-muted/20 animate-pulse" />
            ) : session ? (
              <UserNav />
            ) : (
              <Link href="/auth/login" prefetch={true}>
                <Button size="sm" className="h-9 rounded-md px-4 text-xs font-semibold tracking-wider uppercase">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Draw Toggle Controller */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-foreground focus:outline-none"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Drawer System */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="px-6 py-5 space-y-4">
            <Link prefetch={true} href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground py-1">
              Home
            </Link>
            <Link prefetch={true} href="/users/products" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground py-1">
              Collections
            </Link>
            <Link prefetch={true} href="/users/profile/wishlist" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground py-1">
              Wishlist
            </Link>
            <Link prefetch={true} href="/users/profile/orders" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground py-1">
              Order Tracking
            </Link>
            <Link prefetch={true} href="/users/about" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground py-1">
              About
            </Link>
            <Link prefetch={true} href="/users/cart" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-foreground py-1">
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}