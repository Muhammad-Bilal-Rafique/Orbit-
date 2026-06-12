import { Loader2 } from "lucide-react";

export default function GlobalSpinner() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Reusable Minimalist Container */}
      <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl border border-border/50 bg-card shadow-lg max-w-xs text-center">
        
        {/* Animated Smooth Spinner */}
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-9 w-9 text-primary animate-spin" />
        </div>

        {/* Meaningful & Simple Context Feedback */}
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Please wait
          </h3>
        </div>

      </div>
    </div>
  );
}