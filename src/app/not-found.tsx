import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-7xl font-black tracking-tighter text-muted-foreground/30">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          The asset or page network path you are looking for does not exist or has been relocated.
        </p>
      </div>

      <Button variant="outline" className="h-10 rounded-md text-xs font-medium tracking-wide">
        <Link href="/" className="flex items-center gap-2">
          <MoveLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}