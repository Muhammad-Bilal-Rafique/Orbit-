"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function DateRangePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleDateChange = (type: "from" | "to", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 bg-card border border-border px-3 h-9 rounded-md shadow-2xs">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase text-muted-foreground/80">From:</span>
        <input 
          type="date" 
          defaultValue={searchParams.get("from") || ""}
          onChange={(e) => handleDateChange("from", e.target.value)}
          className="bg-transparent text-xs text-foreground focus:outline-hidden font-medium font-mono border-none accent-primary"
        />
      </div>
      <div className="h-4 w-px bg-border mx-1" />
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase text-muted-foreground/80">To:</span>
        <input 
          type="date" 
          defaultValue={searchParams.get("to") || ""}
          onChange={(e) => handleDateChange("to", e.target.value)}
          className="bg-transparent text-xs text-foreground focus:outline-hidden font-medium font-mono border-none accent-primary"
        />
      </div>
    </div>
  );
}