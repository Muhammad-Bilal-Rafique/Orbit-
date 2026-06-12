"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-muted-foreground mb-6">
          Your payment has been processed
        </p>
        <div className="space-y-3">
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}