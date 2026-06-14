"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Boxes, 
  PlusCircle, 
  ClipboardList 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Inventory Matrix",
      href: "/admin/inventory",
      icon: Boxes,
    },
    {
      name: "Add Product",
      href: "/admin/addProduct",
      icon: PlusCircle,
    },
    {
      name: "Order Flow",
      href: "/admin/orderManagement",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      
      {/*  1. TOP SECURE IDENTITY BAR */}
      <header className="w-full border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Identity Vector */}
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 bg-primary text-primary-foreground font-black text-xs flex items-center justify-center rounded-lg tracking-tighter">
              Ω
            </span>
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">
              Orbit <span className="text-muted-foreground/80 font-normal lowercase text-xs ml-1">Control Panel</span>
            </span>
          </div>

          {/* S-Rank Minimal Right Status Node */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
              Session Secure
            </span>
          </div>
        </div>
      </header>

      {/*  2. HORIZONTAL ROW-WISE NAVIGATION TRACK */}
      <div className="w-full border-b border-border/60 top-0 z-40 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 h-12 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 h-full text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/*  3. FULL-WIDTH EXECUTIVE WORKSPACE BLOCK */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 py-8">
        <div className="w-full bg-card/20 border border-border/40 rounded-lg p-6 shadow-2xs min-h-[60vh]">
          {children}
        </div>
      </main>

      {/* 4. HIGH-END SIMPLE FOOTER */}
      <footer className="w-full border-t border-border/50 bg-card/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          <span>Orbit Operational Hub v2.1.0</span>
          <span>© 2026 Core Infrastructure</span>
        </div>
      </footer>

    </div>
  );
}