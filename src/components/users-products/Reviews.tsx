// /components/users-products/Reviews.tsx
"use client";

import { useEffect, useState } from "react";
import { getProductReviewsAction } from "@/app/actions/review";
import { Star, Sparkles } from "lucide-react";

interface ReviewNode {
  _id: string;
  userId: {
    _id: string;
    name?: string;
    email?: string;
  } | null;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsProps {
  productId: string;
  aiSummaryFromDb?: string; 
}

export default function Reviews({ productId, aiSummaryFromDb }: ReviewsProps) {
  console.log("AI summary from DB:", aiSummaryFromDb);
  const [reviews, setReviews] = useState<ReviewNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      const res = await getProductReviewsAction(productId);
      if (res.success && res.reviews) {
        setReviews(res.reviews);
      }
      setLoading(false);
    }
    loadReviews();
  }, [productId]);

  const totalReviews = reviews.length;
  const averageRating = totalReviews 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 space-x-2">
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Loading reviews data...</p>
      </div>
    );
  }

  return (
    <div className="w-full border-t border-border/40 pt-12 mt-12 px-2 md:px-4 space-y-10">
      
      {/* HEADER FEEDBACK ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Customer Reviews
          </h2>
          <p className="text-sm text-muted-foreground">
            Verified feedback and product ratings from the Orbit community.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-secondary/30 border border-border/50 px-3.5 py-2 rounded-xl self-start sm:self-auto shadow-xs">
          <span className="text-sm font-bold text-foreground">{averageRating} / 5.0</span>
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(Number(averageRating)) ? "fill-amber-500" : "text-border"}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({totalReviews} Reviews)</span>
        </div>
      </div>

      {/* ✨ LIVE 0ms LATENCY AI SUMMARIZER CARD */}
      {aiSummaryFromDb && (
        <div className="p-5 rounded-2xl border border-primary/10 bg-linear-to-br from-primary/2 via-transparent to-transparent space-y-2.5 relative overflow-hidden shadow-xs animate-in fade-in duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center space-x-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-widest">AI Summary of Reviews</h4>
          </div>
          <p className="text-sm text-foreground/90 font-medium leading-relaxed max-w-3xl">
            {aiSummaryFromDb} 
          </p>
        </div>
      )}

      {/* MAIN LIST RENDERING DATA PIPELINE */}
      {totalReviews === 0 ? (
        <div className="text-center py-16 border border-dashed border-border/60 rounded-2xl bg-card/15 my-4">
          <p className="text-sm text-muted-foreground">No reviews deployed for this asset signature yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-border/30 space-y-8">
          {reviews.map((review) => {
            const fallbackName = "Orbit Customer";
            const userName = review.userId?.name || fallbackName;
            const userEmail = review.userId?.email || "verified@orbit.com";
            const initialDp = userName.charAt(0).toUpperCase();

            return (
              <div key={review._id} className="pt-8 first:pt-0 flex items-start space-x-4">
                
                {/* 👤 THE PREMIUM MINIMALIST DP BLOCK */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary border border-border/60 flex items-center justify-center font-bold text-sm text-foreground/80 tracking-tighter shadow-xs">
                  {initialDp}
                </div>

                {/* TEXT CONTENT CONTAINER */}
                <div className="space-y-1.5 flex-1">
                  
                  {/* ALIGNED NAME & STARS OVERVIEW LINE */}
                  <div className="flex flex-col space-y-0.5">
                    <div className="flex items-center space-x-2.5">
                      <h4 className="text-sm font-bold text-foreground tracking-tight leading-none">
                        {userName}
                      </h4>
                      
                      {/* 🔥 STARS RIGHT NEXT TO THE NAME BLOCK */}
                      <div className="flex text-amber-500 translate-y-[-1px]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-amber-500" : "text-border/30"}`} />
                        ))}
                      </div>
                    </div>
                    
                    <span className="text-xs text-muted-foreground/60 font-medium">
                      {userEmail}
                    </span>
                  </div>

                  {/* CUSTOMER DIRECT COMMENT */}
                  <p className="text-sm text-foreground/90 font-normal leading-relaxed tracking-wide pt-0.5 max-w-3xl">
                    {review.comment}
                  </p>

                  {/* TIMESTAMP BLOCK */}
                  <div className="text-[11px] text-muted-foreground/40 font-medium pt-0.5">
                    Reviewed on {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}