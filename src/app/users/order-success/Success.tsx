"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Home, PackageCheck } from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden relative">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        
        {/* Cascade sequential configuration layout engine */}
        <MotionView stagger={0.12} className="flex flex-col items-center">
 
          <MotionItem>
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 relative group shadow-lg shadow-emerald-500/5">
              
              {/* Outer decorative breathing ring pulse */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-emerald-500/30 pointer-events-none"
              />

              {/* Central Vector Pop Up Icon Node */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 180, 
                  damping: 15,
                  delay: 0.1 
                }}
                className="flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
              </motion.div>
            </div>
          </MotionItem>

          {/* MAIN HEADER TYPOGRAPHY STATEMENT */}
          <MotionItem>
            <h1 className="text-3xl font-black tracking-tight text-foreground mb-3">
              Order Placed Successfully
            </h1>
          </MotionItem>

          {/* TELEMETRY DISPATCH CONTEXT SUBTEXT */}
          <MotionItem>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto leading-relaxed font-medium">
              Your billing intent was encrypted, authorized, and logged under our secure checkout matrix.
            </p>
          </MotionItem>

          {/* QUICK GATEWAY NAVIGATION FOOTER */}
          <MotionItem className="w-full">
            <div className="space-y-3 w-full">
              
              <Button size="lg" className="w-full h-12 rounded-xl text-xs uppercase font-bold tracking-widest transition-all hover:scale-[1.01] cursor-pointer bg-foreground text-background hover:bg-foreground/90 shadow-md">
                <Link href="/users/orders" className="flex items-center justify-center gap-2">
                  <PackageCheck className="w-4 h-4" strokeWidth={2} />
                  Track Order History
                </Link>
              </Button>

              <Button  size="lg" variant="secondary" className="w-full h-12 rounded-xl text-xs uppercase font-medium tracking-widest transition-all hover:scale-[1.01] border border-border/40 cursor-pointer bg-secondary/50 text-foreground group">
                <Link href="/users/products" className="flex items-center justify-center gap-2">
                  Continue Shopping
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              
              <Button  size="lg" variant="outline" className="w-full h-12 rounded-xl text-xs uppercase font-medium tracking-widest bg-background/20 hover:bg-muted cursor-pointer transition-colors flex items-center justify-center gap-2">
                <Link href="/" className="flex items-center justify-center gap-2">
                  <Home className="w-3.5 h-3.5 opacity-70" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </MotionItem>

        </MotionView>
      </div>
    </div>
  );
}