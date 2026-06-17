"use client";

import Link from "next/link";
import { 
  Shirt, 
  Layers,
  Wind, 
  Flame, 
  Sun, 
  Scissors,
  ArrowUpRight 
} from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

const CATEGORIES = [
  { name: "T-Shirts", href: "/products?category=t-shirts", icon: Shirt },
  { name: "Shirts", href: "/products?category=shirts", icon: Scissors },
  { name: "Hoodies", href: "/products?category=hoodies", icon: Flame },
  { name: "Jackets", href: "/products?category=jackets", icon: Wind },
  { name: "Pants", href: "/products?category=pants", icon: Layers },
  { name: "Shorts", href: "/products?category=shorts", icon: Sun },
];

export default function CategoriesSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-card to-background pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main staggered animated container node */}
        <MotionView stagger={0.1}>
          
          {/* Premium Section Header */}
          <MotionItem>
            <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row md:mb-16 w-full">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  Shop by Category
                </h2>
                <p className="mt-2 text-muted-foreground text-sm font-medium">
                  Find exactly what you're looking for.
                </p>
              </div>
              <Link 
                href="/users/products" 
                className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80 cursor-pointer"
              >
                <span>View all collections</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </MotionItem>

          {/* Interactive Bento Grid Layout */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6 w-full">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <MotionItem key={category.name} className="w-full">
                  <Link 
                    href={category.href}
                    className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 dark:hover:bg-white/5 cursor-pointer w-full h-full"
                  >
                    {/* Background Hover Gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Animated Icon Wrapper */}
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]">
                      <Icon className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    
                    <span className="relative z-10 text-sm font-bold tracking-tight text-foreground sm:text-base">
                      {category.name}
                    </span>
                  </Link>
                </MotionItem>
              );
            })}
          </div>

        </MotionView>
        
      </div>
    </section>
  );
}