import type { Metadata } from "next";
import Link from "next/link";
import { MoveRight, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

export const metadata: Metadata = {
  title: "Our Story | Orbit",
  description: "Architecting minimalist high-end apparel essentials.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background relative overflow-hidden">

      <div className="absolute top-[-5%] left-[-10%] w-125 h-125 bg-indigo-500/3 dark:bg-indigo-500/2 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-5%] w-100 h-100 bg-emerald-500/2 dark:bg-emerald-500/1 rounded-full blur-[100px] pointer-events-none" />

      {/* 🎬 Control Global Stagger Pipeline straight down */}
      <MotionView stagger={0.12}>
        
        {/* 1. HERO ARCHETYPE HEADER */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-16 space-y-6 relative z-10">
          <MotionItem>
            <div className="inline-flex items-center gap-2 border border-border/60 bg-card/60 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] bg-linear-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                Who We Are
              </span>
            </div>
          </MotionItem>
          
          <MotionItem>
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl leading-[1.05]">
              Premium <span className="bg-linear-to-r from-foreground via-zinc-400 to-foreground/80 bg-clip-text text-transparent">Minimalist</span> Clothing For Everyone.
            </h1>
          </MotionItem>
          
          <MotionItem>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed font-medium pt-2">
              Orbit is all about clean designs and high-quality fabrics. We do not follow fast-fashion trends—we focus strictly on clean, comfortable clothing that lasts and stays timeless.
            </p>
          </MotionItem>
        </section>

        {/* 2. BRAND METRICS BOARD */}
        <MotionItem>
          <section className="border-y border-border/50 bg-linear-to-r from-card/30 via-card/10 to-card/30 backdrop-blur-sm relative z-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: "00 / DROP", label: "Controlled Batches", color: "group-hover:text-indigo-500" },
                { val: "100%", label: "Premium Fabrics", color: "group-hover:text-zinc-400" },
                { val: "ZERO", label: "Excess Clutter", color: "group-hover:text-destructive/80" },
                { val: "GLOBAL", label: "Shipping Pipeline", color: "group-hover:text-emerald-500" }
              ].map((metric, idx) => (
                <div key={idx} className="space-y-1 group cursor-default">
                  <p className={`text-2xl font-black tracking-tight transition-all duration-300 ${metric.color}`}>
                    {metric.val}
                  </p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </MotionItem>

        {/* 3. CORE PILLARS GRID */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-26 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            
            {/* Pillar 1 */}
            <MotionItem>
              <div className="space-y-4 group border-t border-border/50 hover:border-indigo-500/40 pt-6 transition-all duration-300 h-full cursor-default">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/40">[01]</span>
                  <div className="p-2 rounded-md bg-secondary/40 border border-border/40 group-hover:bg-indigo-500/5 group-hover:border-indigo-500/20 transition-all">
                    <Zap className="w-4 h-4 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-bold tracking-tight group-hover:text-indigo-500 transition-colors">The Aesthetic Vision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We eliminate loud graphics, excessive logos, and transient trends. Orbit focuses entirely on raw silhouettes, boxy drapes, and monochrome tones that form a permanent baseline for your wardrobe.
                </p>
              </div>
            </MotionItem>

            {/* Pillar 2 */}
            <MotionItem>
              <div className="space-y-4 group border-t border-border/50 hover:border-zinc-400 pt-6 transition-all duration-300 h-full cursor-default">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/40">[02]</span>
                  <div className="p-2 rounded-md bg-secondary/40 border border-border/40 group-hover:bg-zinc-500/5 group-hover:border-zinc-500/20 transition-all">
                    <ShieldCheck className="w-4 h-4 text-muted-foreground group-hover:text-zinc-400 transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-bold tracking-tight group-hover:text-zinc-400 transition-colors">Textile Sovereignty</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every garment starts at the yarn level. From custom-milled heavyweight luxury cottons to technical performance blends, each piece is engineered for sensory comfort and long-term weave retention.
                </p>
              </div>
            </MotionItem>

            {/* Pillar 3 */}
            <MotionItem>
              <div className="space-y-4 group border-t border-border/50 hover:border-emerald-500/40 pt-6 transition-all duration-300 h-full cursor-default">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/40">[03]</span>
                  <div className="p-2 rounded-md bg-secondary/40 border border-border/40 group-hover:bg-emerald-500/5 group-hover:border-emerald-500/20 transition-all">
                    <Globe className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-bold tracking-tight group-hover:text-emerald-500 transition-colors">Scarcity & Micro Drops</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By working strictly on pre-allocated micro-batches, we eradicate warehouse waste entirely. Our drops are highly exclusive, releasing assets when they reach design perfection rather than fixed calendar schedules.
                </p>
              </div>
            </MotionItem>

          </div>
        </section>

        {/* 4. STATEMENT BRAND BLOCK */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 pb-32 relative z-10">
          <MotionItem>
            <div className="relative border border-border/80 bg-linear-to-b from-card via-card/90 to-card p-10 md:p-16 rounded-xl overflow-hidden flex flex-col items-center text-center space-y-6 shadow-sm">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/2 rounded-full blur-3xl pointer-events-none" />
              
              <p className="text-xl md:text-2xl font-semibold tracking-tight max-w-2xl leading-relaxed italic text-foreground/90">
                "Simplicity is not the absence of clutter, but the absolute presence of clarity."
              </p>
              
              <div className="space-y-5 pt-2">
                <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-muted-foreground">
                  — The Orbit Design System Manifest
                </p>
                
                <div className="flex justify-center pt-1">
                  <Link 
                    href="/users/products" 
                    className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest bg-foreground text-background hover:opacity-90 active:scale-[0.98] px-8 h-12 rounded-md transition-all duration-300"
                  >
                    Explore Current Assets
                    <MoveRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </MotionItem>
        </section>

      </MotionView>
    </div>
  );
}