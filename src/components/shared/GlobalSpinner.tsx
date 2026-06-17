import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/40 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* 🔮 Unique Double-Ring Animated Dynamic Layer */}
      <div className="relative flex items-center justify-center">
        
        {/* Outer Pulsing Aura Ring */}
        <div className="absolute h-16 w-16 rounded-full border border-primary/20 animate-ping duration-1000" />
        
        {/* Secondary Counter-Rotating Border Track */}
        <div className="absolute h-12 w-12 rounded-full border-2 border-border border-t-primary/40 animate-spin animation-duration:[1.5s]" />
        
        {/* Core Lucide Spinner Component */}
        <Loader2 className="h-7 w-7 text-primary animate-spin animation-duration:[0.8s] relative z-10" />
        
      </div>

    </div>
  );
}