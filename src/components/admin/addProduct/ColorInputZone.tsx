"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ColorInputZone({ colors, setColors }: Props) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input.trim();
      if (val && !colors.includes(val)) {
        setColors([...colors, val]);
        setInput("");
      }
    }
  };

  const removeColor = (idxToRemove: number) => {
    setColors(colors.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Add Available Colors (Press Enter)</Label>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., Charcoal Black, Off-White"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {colors.map((color, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full flex items-center gap-1.5 border border-primary/20 backdrop-blur-sm"
          >
            {color}
            <button
              type="button"
              onClick={() => removeColor(idx)}
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