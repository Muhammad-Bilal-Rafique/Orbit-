import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsSkeleton() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* TOP HEADER ROW SKELETON */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-3">
            {/* Title Block */}
            <Skeleton className="h-9 w-48 sm:w-64 bg-muted/30 rounded-md animate-pulse" />
            {/* Subtitle Block */}
            <Skeleton className="h-4 w-32 sm:w-40 bg-muted/20 rounded-sm animate-pulse" />
          </div>
          {/* Button Slot "View All" */}
          <Skeleton className="h-10 w-24 bg-muted/20 rounded-md animate-pulse" />
        </div>

        {/* FEATURED CARDS GRID SKELETON (4 Columns to match homepage asset flow) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index} 
              className="border border-border/40 rounded-2xl p-4 bg-card/30 space-y-4 shadow-sm"
            >
              {/* Product Thumbnail Box Image vector */}
              <Skeleton className="h-56 w-full bg-muted/30 rounded-xl animate-pulse" />
              
              {/* Product Information Specs Meta */}
              <div className="space-y-2.5">
                {/* Title Line */}
                <Skeleton className="h-4 w-5/6 bg-muted/30 rounded animate-pulse" />
                {/* Category/Tags Mini tag */}
                <Skeleton className="h-3 w-1/3 bg-muted/20 rounded-sm animate-pulse" />
              </div>

              {/* Pricing Metric Footer Row */}
              <div className="flex items-center justify-between pt-2">
                {/* Price tag */}
                <Skeleton className="h-5 w-20 bg-muted/30 rounded animate-pulse" />
                {/* Bag / Cart Icon Box */}
                <Skeleton className="h-8 w-8 rounded-full bg-muted/20 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}