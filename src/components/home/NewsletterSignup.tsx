"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MotionView, MotionItem } from "@/components/shared/motion-view";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("Triggering...")
    setIsSubmitting(true);
    
    try {
      toast.success("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe Please try again later!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-card border-t border-border py-16 md:py-24 overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Subtle dynamic entry wrapper */}
        <MotionView stagger={0.2}>
          
          <MotionItem>
            <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
              Stay Updated
            </h2>
          </MotionItem>

          <MotionItem>
            <p className="text-muted-foreground mb-8 text-sm font-medium">
              Get exclusive offers and new arrivals delivered to your inbox.
            </p>
          </MotionItem>

          <MotionItem>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="flex-1 h-11 rounded-xl bg-background/50 border-border/60"
              />
              <Button type="submit" disabled={isSubmitting} className="sm:w-auto h-11 rounded-xl px-6 font-semibold cursor-pointer transition-transform hover:scale-[1.02]">
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </MotionItem>

        </MotionView>
      </div>
    </section>
  );
}