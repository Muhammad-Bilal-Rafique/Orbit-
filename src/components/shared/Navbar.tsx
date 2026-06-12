"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Menu, X, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import UserNav from "./user-nav";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState<boolean>(false);
  const cartCount = useCartStore((state) => state.getTotalItems());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/users/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-0" prefetch={true}>
          <div className="relative w-56 h-20">
            <Image
              src={Logo}
              alt="Orbit"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Search - Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xs"
        >
          <div className="relative group w-full max-w-md">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70 transition-colors group-focus-within:text-primary animate-pulse pointer-events-none" />

            <Input
              id="navbar-search-input"
              placeholder="Describe your vibe (e.g., 'minimalist dark aesthetic')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm bg-background/50 backdrop-blur-sm border-border/50 transition-all duration-300 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary/50"
            />
          </div>
        </form>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
          prefetch={true}
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
          prefetch={true}
            href="/users/products"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Products
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link href="/users/cart" prefetch={true} className="relative">
            <ShoppingCart className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-4">
            {/* ⚡ S-RANK SHIELD: Jab tak state loading mein hai, kuch mat dikhao ya ek blank spot rakho */}
            {status === "loading" ? (
              // Ek chota sa rounded transparent box taaki space reserve rahe aur layout jhatka na maare
              <div className="w-9 h-9 rounded-full bg-muted/20 animate-pulse" />
            ) : session ? (
              <UserNav />
            ) : (
              <Link href="/auth/login" prefetch={true}>
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <form
            onSubmit={handleSearch}
            className="px-4 py-3 border-b border-border"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
          </form>
          <div className="px-4 py-3 space-y-2">
            <Link
            prefetch={true}
              href="/"
              className="block text-sm font-medium text-foreground hover:text-primary py-2"
            >
              Home
            </Link>
            <Link
            prefetch={true}
              href="/products"
              className="block text-sm font-medium text-foreground hover:text-primary py-2"
            >
              Products
            </Link>
            <Link
            prefetch={true}
              href="/users/cart"
              className="block text-sm font-medium text-foreground hover:text-primary py-2"
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
