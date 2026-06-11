"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ReviewModalProps {
  productId: string;
  productName: string;
}

export default function ReviewModal({ productId, productName }: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating tier before submitting.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please formulate your experience review comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 💡 TO-DO PART 2/3: Real POST API implementation using Axios
      // await axios.post("/api/products/addReview", { productId, rating, comment });
      
      console.log("Review payload verified:", { productId, rating, comment });
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Review architecture submitted successfully!");
      setIsOpen(false);
      
      setRating(0);
      setComment("");
    } catch (error: any) {
      toast.error("Sync failure while publishing customer review validation tier.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* ⚡ CRITICAL FIX: Removed asChild and nested <Button>. 
          Using clean custom interactive wrapper class direct on trigger */}
      <DialogTrigger className="h-7 text-xs px-3 border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-500 font-semibold rounded-md transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer focus:outline-none select-none">
        <MessageSquare className="w-3 h-3" />
        <span>Write Review</span>
      </DialogTrigger>

      {/* POP-UP MODAL PANEL */}
      <DialogContent className="sm:max-w-[425px] border-border bg-card text-foreground shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Product Review Matrix</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs leading-relaxed">
            Formulate your consumer experience assessment regarding the purchase asset: <span className="text-foreground font-semibold">"{productName}"</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-3">
          {/* THE 5-STAR INTERACTIVE ENGINE */}
          <div className="flex flex-col items-center justify-center gap-2 p-4 border border-border rounded-lg bg-secondary/20">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Assessment Rating</p>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isActive = hoverRating ? starValue <= hoverRating : starValue <= rating;
                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110 duration-100 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 stroke-1.5 transition-colors ${
                        isActive 
                          ? "fill-amber-400 text-amber-400 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]" 
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMMENT FEEDBACK INPUT TEXTAREA */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Review Narrative</p>
            <Textarea
              placeholder="What did you like or dislike? Detail your technical or stylistic appraisal..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-25 max-w-full border-border bg-background resize-none focus-visible:ring-1 focus-visible:ring-primary text-sm whitespace-pre-wrap break-words break-all box-border"
              maxLength={300}
            />
            <div className="text-[10px] text-muted-foreground text-right">
              {comment.length}/300 characters
            </div>
          </div>

          {/* SYSTEM SUBMIT ACTION */}
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)} disabled={isSubmitting} className="text-xs">
              Cancel
            </Button>
            <Button 
              type="button"
              size="sm" 
              onClick={handleSubmitReview} 
              disabled={isSubmitting}
              className="text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground min-w-[100px]"
            >
              {isSubmitting ? "Syncing..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}