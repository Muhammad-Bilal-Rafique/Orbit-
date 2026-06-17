"use client";
import { Truck, RotateCcw, Shield } from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

const BADGES = [
  {
    icon: Truck,
    title: "Complimentary Shipping",
    description: "Expedited delivery on orders exceeding $50",
  },
  {
    icon: RotateCcw,
    title: "30-Day Evaluation",
    description: "Seamless returns and personalized exchanges",
  },
  {
    icon: Shield,
    title: "Encrypted Checkout",
    description: "Secured with bank-grade encryption protocols",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-background py-20 md:py-28 border-t border-border/30 relative overflow-hidden">
      {/* Subtle Background Minimalist Ambient Light Shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/1 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/1 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main staggered animated container node using our global helper */}
        <MotionView 
          stagger={0.2}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <MotionItem key={badge.title} className="w-full">
                <div 
                  className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-border/10 bg-linear-to-b from-secondary/15 to-transparent hover:from-secondary/30 hover:border-primary/10 transition-all duration-500 ease-out shadow-xs h-full w-full"
                >
                  {/* Micro-interactive Subtle Glow On Hover */}
                  <div className="absolute inset-0 bg-primary/1 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none blur-md" />
                  
                  {/* Elite Icon Container Wrapper */}
                  <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-secondary/80 border border-border/50 text-foreground/80 group-hover:text-primary group-hover:border-primary/20 group-hover:scale-105 transition-all duration-500 ease-out shadow-xs relative">
                    <Icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-1" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/90 mb-2.5 transition-colors duration-300 group-hover:text-foreground">
                    {badge.title}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed max-w-60">
                    {badge.description}
                  </p>
                </div>
              </MotionItem>
            );
          })}
        </MotionView>
      </div>
    </section>
  );
}