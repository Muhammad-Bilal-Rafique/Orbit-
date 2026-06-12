import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-200">
      
      {/* LEFT SIDE: Big Product Image Box Gallery Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-[450px] md:h-[550px] w-full bg-muted/30 rounded-3xl animate-pulse" />
        {/* Thumbnails grid container */}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full bg-muted/20 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
      
      {/* RIGHT SIDE: Product Meta Meta Specifications Data Info */}
      <div className="space-y-6 pt-4">
        {/* Category Badge & Availability Line */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24 bg-muted/20 rounded-full animate-pulse" />
          <Skeleton className="h-5 w-16 bg-muted/20 rounded-full animate-pulse" />
        </div>

        {/* Title Block */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-5/6 bg-muted/30 rounded-lg animate-pulse" />
          <Skeleton className="h-4 w-1/3 bg-muted/20 rounded animate-pulse" />
        </div>

        <hr className="border-border/60" />

        {/* Pricing Zone */}
        <div className="space-y-1.5">
          <Skeleton className="h-8 w-32 bg-muted/30 rounded animate-pulse" />
          <Skeleton className="h-3 w-48 bg-muted/20 rounded animate-pulse" />
        </div>

        {/* Description Specs Blocks */}
        <div className="space-y-2.5 pt-4">
          <Skeleton className="h-4 w-full bg-muted/25 rounded animate-pulse" />
          <Skeleton className="h-4 w-full bg-muted/25 rounded animate-pulse" />
          <Skeleton className="h-4 w-4/5 bg-muted/25 rounded animate-pulse" />
        </div>

        {/* Interactive Buy Attributes Actions buttons layout */}
        <div className="pt-8 space-y-4">
          <div className="flex items-center gap-4">
            {/* Quantity Counter Block */}
            <Skeleton className="h-11 w-28 bg-muted/20 rounded-xl animate-pulse" />
            {/* Add To Cart Button */}
            <Skeleton className="h-11 flex-1 bg-muted/30 rounded-xl animate-pulse" />
          </div>
          {/* Wishlist button */}
          <Skeleton className="h-11 w-full bg-muted/10 rounded-xl animate-pulse" />
        </div>
      </div>

    </div>
  );
}