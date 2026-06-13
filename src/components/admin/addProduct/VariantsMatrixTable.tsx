"use client";
import React from "react";
import { Input } from "@/components/ui/input";

interface VariantItem {
  color: string;
  size: string;
  price: number | string;
  stock: number | string;
}

interface Props {
  variants: VariantItem[];
  setVariants: React.Dispatch<React.SetStateAction<VariantItem[]>>;
}

export default function VariantsMatrixTable({ variants, setVariants }: Props) {
  const handleVariantChange = (index: number, key: "price" | "stock", value: string) => {
    const updated = [...variants];
    updated[index] = {
      ...updated[index],
      [key]: value === "" ? "" : Number(value),
    };
    setVariants(updated);
  };

  return (
    <div className="mt-6 border rounded-lg overflow-hidden animate-in fade-in duration-300">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left border-b">
          <tr>
            <th className="p-3">Variant Combination</th>
            <th className="p-3 w-32">Price ($)</th>
            <th className="p-3 w-32">Stock Count</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {variants.map((variant, index) => (
            <tr key={index} className="hover:bg-muted/30 transition-colors">
              <td className="p-3 font-medium flex items-center gap-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs border">{variant.color}</span>
                <span className="text-muted-foreground">/</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs border">{variant.size}</span>
              </td>
              <td className="p-3">
                <Input
                required
                  type="number"
                  placeholder="Price"
                  className="w-full px-2 py-1"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                />
              </td>
              <td className="p-3">
                <Input
                required
                  type="number"
                  placeholder="Stock"
                  className="w-full px-2 py-1"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}