"use client";

import Link from "next/link";
import { 
  Shirt, 
  Layers, 
  Footprints, 
  CloudRain, 
  Flame, 
  Sun, 
  Watch, 
  ArrowUpRight 
} from "lucide-react";

// 1. Enriched Data Structure with Icons
const CATEGORIES = [
  { name: "Shirts", href: "/products?category=shirts", icon: Shirt },
  { name: "Pants", href: "/products?category=pants", icon: Layers },
  { name: "Shoes", href: "/products?category=shoes", icon: Footprints },
  { name: "Jackets", href: "/products?category=jackets", icon: CloudRain },
  { name: "Hoodies", href: "/products?category=hoodies", icon: Flame },
  { name: "Shorts", href: "/products?category=shorts", icon: Sun },
  { name: "Accessories", href: "/products?category=accessories", icon: Watch },
];

export default function CategoriesSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-card to-background pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 2. Premium Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row md:mb-16">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Find exactly what you're looking for.
            </p>
          </div>
          <Link 
            href="/users/products" 
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all collections
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 3. Interactive Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-7">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name} 
                href={category.href}
                className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 dark:hover:bg-white/5"
              >
                {/* Background Hover Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* 4. Animated Icon Wrapper */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]">
                  <Icon className="h-6 w-6 stroke-[1.5]" />
                </div>
                
                <span className="relative z-10 text-sm font-bold tracking-tight text-foreground sm:text-base">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}