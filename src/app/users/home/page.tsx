import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoriesSection from "@/components/home/CategoriesSection";
import TrustBadges from "@/components/home/TrustBadges";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import {Suspense} from "react"
import ProductsSkeleton from "@/components/skeletons/products-skeleton"
import type {Metadata} from "next"
import { getActiveWishlistIdsAction } from "@/app/actions/wishlist";

export const metadata: Metadata = {
  title: "Orbit | Curated High-End Tech & Minimalist Gear",
  description: "Explore Orbit's ultra-clean collection of luxury hardware and architectural minimalist design accessories. Experience next-generation ecommerce.",
};

export default async function HomePage() {
  const wishlistRes = await getActiveWishlistIdsAction();
  const wishlistIds = wishlistRes.success ? wishlistRes.ids : [];
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<ProductsSkeleton />}>
      <FeaturedProducts initialWishlistIds={wishlistIds}/>
      </Suspense>
      <CategoriesSection />
      <TrustBadges />
      <NewsletterSignup />
    </main>
  );
}