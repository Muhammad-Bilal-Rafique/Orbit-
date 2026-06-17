"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-20">
      {/* 1. Background Grid Vector Layer */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* 2. Main Staggered Animated Content Block */}
      <MotionView 
        stagger={0.12} 
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center"
      >
        
        {/* Collection Drop Indicator Pill */}
        <MotionItem>
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>New Collection Drop</span>
          </div>
        </MotionItem>

        {/* Hero Copywriting Header Section */}
        <div className="flex flex-col gap-4 w-full items-center">
          <MotionItem className="w-full">
            <h1 className="text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Elevate Your <br className="hidden sm:block" />
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Everyday Style
              </span>
            </h1>
          </MotionItem>
          
          <MotionItem className="w-full">
            <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
              Explore our curated collection of premium clothing and accessories. Uncompromising quality designed for the modern trendsetter.
            </p>
          </MotionItem>
        </div>

        {/* Interaction Call to Actions (CTAs) Layout */}
        <MotionItem className="w-full">
          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row sm:items-center mt-4">
            <Button size="lg" className="h-12 gap-2 rounded-full px-8 text-base transition-all hover:scale-105 cursor-pointer">
              <Link href="/users/products" className="flex gap-2 items-center">
                <span>Shop the Drop</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 gap-2 rounded-full bg-background/50 px-8 text-base backdrop-blur-sm transition-all hover:bg-muted hover:scale-105 cursor-pointer"
            >
              <Link href="/users/products" className="flex gap-2 items-center">
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Collections</span>
              </Link>
            </Button>
          </div>
        </MotionItem>

      </MotionView>
    </section>
  );
}