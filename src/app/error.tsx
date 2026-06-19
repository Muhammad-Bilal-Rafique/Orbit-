"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Backend matrix logging setup (Production check fallback)
    console.error("System pipeline crash intercept:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="space-y-2">
        <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-2 font-mono text-xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          System Sync Delayed
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          An unhandled exception occurred within the data stream routing. Connection to database matrix might be timed out.
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button 
          onClick={() => reset()} 
          className="h-10 rounded-md text-xs font-medium tracking-wide flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retry Connection
        </Button>
      </div>
    </div>
  );
}