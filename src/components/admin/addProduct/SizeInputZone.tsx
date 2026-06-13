"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SizeInputZone({ sizes, setSizes }: Props) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input.trim().toUpperCase();
      if (val && !sizes.includes(val)) {
        setSizes([...sizes, val]);
        setInput("");
      }
    }
  };

  const removeSize = (idxToRemove: number) => {
    setSizes(sizes.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Add Available Sizes (Press Enter)</Label>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., S, M, L, XL"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {sizes.map((size, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5 border border-emerald-500/20 backdrop-blur-sm"
          >
            {size}
            <button
              type="button"
              onClick={() => removeSize(idx)}
              className="hover:text-destructive font-bold transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}