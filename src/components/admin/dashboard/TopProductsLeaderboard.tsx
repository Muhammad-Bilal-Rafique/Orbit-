"use client";

import { useMemo } from "react";
import { OrderType } from "@/types/OrderTypes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Star, TrendingUp } from "lucide-react";

interface TopProductsLeaderboardProps {
  orders: OrderType[];
}

interface RankedProduct {
  productId: string;
  name: string;
  unitsSold: number;
  revenueGenerated: number;
}

export default function TopProductsLeaderboard({ orders }: TopProductsLeaderboardProps) {
  
  const leaderboardData = useMemo(() => {
    const productMap: { [key: string]: RankedProduct } = {};

    if (Array.isArray(orders)) {
      orders.forEach((order) => {
        if (order.status === "cancelled" || !order.items) return;

        order.items.forEach((item) => {
          const groupingKey = item.name.trim().toLowerCase();
          const qty = Number(item.quantity) || 0;
          const price = Number(item.price) || 0;
          const subtotal = price * qty;

          if (productMap[groupingKey]) {
            productMap[groupingKey].unitsSold += qty;
            productMap[groupingKey].revenueGenerated += subtotal;
          } else {
            productMap[groupingKey] = {
              productId: item.productId,
              name: item.name,
              unitsSold: qty,
              revenueGenerated: subtotal,
            };
          }
        });
      });
    }

    return Object.values(productMap)
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 5);
  }, [orders]);

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-4 h-4 text-amber-400" />;
      case 1: return <Star className="w-4 h-4 text-slate-300" />;
      case 2: return <TrendingUp className="w-4 h-4 text-amber-600" />;
      default: return <span className="text-xs font-mono font-bold text-muted-foreground pl-1">#{index + 1}</span>;
    }
  };

  return (
    <Card className="border-border bg-card shadow-sm rounded-lg font-sans">
      <CardHeader className="pb-4">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground/90">
          Top Performing Items
        </CardTitle>
        <CardDescription className="text-[11px] text-muted-foreground">
          Top 5 products ranked by volume velocity and transactional capital distribution.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-16 text-[10px] font-bold uppercase tracking-wider pl-4">Rank</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">Product Spec</TableHead>
              <TableHead className="text-center text-[10px] font-bold uppercase tracking-wider w-36">Units Sold</TableHead>
              <TableHead className="text-right text-[10px] font-bold uppercase tracking-wider w-40 pr-4">Gross Income</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-sm text-muted-foreground">
                  No sales matrix metadata processed yet.
                </TableCell>
              </TableRow>
            ) : (
              leaderboardData.map((product, index) => (
                <TableRow key={product.productId} className="border-border hover:bg-secondary/10 transition-colors">
                  <TableCell className="pl-4 py-3">
                    <div className="flex items-center justify-start h-5">{getRankBadge(index)}</div>
                  </TableCell>
                  <TableCell className="font-medium text-xs md:text-sm text-foreground tracking-tight max-w-50 truncate">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-secondary text-foreground">
                      {product.unitsSold} pcs
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-xs md:text-sm text-foreground pr-4 font-mono">
                    ${product.revenueGenerated.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}