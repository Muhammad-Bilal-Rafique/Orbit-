"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

// High-quality placeholder images that fit an aesthetic streetwear vibe
const CATEGORIES = [
  { 
    name: "T-Shirts", 
    href: "/users/products?category=t-shirts",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Shirts", 
    href: "/users/products?category=shirts",
    img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Hoodies", 
    href: "/users/products?category=hoodies",
    img: "https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    name: "Jackets", 
    href: "/users/products?category=jackets",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Pants", 
    href: "/users/products?category=pants",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Shorts", 
    href: "/users/products?category=shorts",
    img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop" 
  },
];

export default function CategoriesSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <MotionView stagger={0.08}>
          
          {/* Header */}
          <MotionItem>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row border-b border-border/40 pb-4 w-full">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight text-foreground uppercase">
                  Shop by Category
                </h2>
                <p className="text-muted-foreground text-xs font-medium">
                  Find exactly what you're looking for.
                </p>
              </div>
              
              <Link 
                href="/users/products" 
                className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground cursor-pointer pt-2 sm:pt-0 underline underline-offset-4"
              >
                <span>View all collections</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </MotionItem>

          {/* 🚀 Elite Visual Image Overlay Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 w-full">
            {CATEGORIES.map((category) => (
              <MotionItem key={category.name} className="h-72 w-full">
                <Link 
                  href={category.href}
                  className="group relative flex h-full w-full flex-col items-center justify-end overflow-hidden rounded-xl border border-border/40 bg-muted cursor-pointer select-none pb-6"
                >
                  {/* Background Image Element */}
                  <img 
                    src={category.img} 
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Dark Elegant Shading Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 opacity-90 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />
                  
                  {/* Text Label */}
                  <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 group-hover:-translate-y-1">
                    {category.name}
                  </span>
                </Link>
              </MotionItem>
            ))}
          </div>

        </MotionView>
        
      </div>
    </section>
  );
}