"use client";

import { useMemo } from "react";
import { OrderType } from "@/types/OrderTypes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface AnalyticsChartsProps {
  orders: OrderType[];
}

const chartConfig = {
  revenue: { label: "Net Revenue", color: "hsl(var(--primary))" },
  orders: { label: "Invoices Issued", color: "hsl(var(--chart-2, 210 100% 50%))" },
} satisfies ChartConfig;

export default function AnalyticsCharts({ orders }: AnalyticsChartsProps) {
  
  const chartData = useMemo(() => {
    const dailyMap: { [key: string]: { timestamp: number; date: string; revenue: number; orders: number } } = {};

    if (Array.isArray(orders)) {
      orders.forEach((order) => {
        if (!order.createdAt) return;
        
        const orderDate = new Date(order.createdAt);
        const dateLabel = orderDate.toLocaleString("en-US", { month: "short", day: "numeric", year: "2-digit" });
        const startOfDayTimestamp = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate()).getTime();

        const isCancelled = order.status === "cancelled";
        const numericAmount = Number(order.totalAmount) || 0;

        if (dailyMap[dateLabel]) {
          dailyMap[dateLabel].revenue += isCancelled ? 0 : numericAmount;
          dailyMap[dateLabel].orders += 1;
        } else {
          dailyMap[dateLabel] = {
            timestamp: startOfDayTimestamp,
            date: dateLabel,
            revenue: isCancelled ? 0 : numericAmount,
            orders: 1,
          };
        }
      });
    }

    return Object.values(dailyMap).sort((a, b) => a.timestamp - b.timestamp);
  }, [orders]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      
      {/* REVENUE PERFORMER */}
      <Card className="border-border bg-card shadow-sm rounded-lg font-sans">
        <CardHeader className="pb-4">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground/90">
            Revenue Performance
          </CardTitle>
          <CardDescription className="text-[11px] text-muted-foreground mt-0.5">
            Daily cash distributions tracked across chronological timeline models.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig} className="h-60 w-full">
            <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} className="text-[10px] fill-muted-foreground" />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-[10px] fill-muted-foreground" tickFormatter={(v) => `$${v}`} />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" formatter={(v) => `$${v}`} />} />
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#revenueFill)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* VOLUME MATRIX COUNTER */}
      <Card className="border-border bg-card shadow-sm rounded-lg font-sans">
        <CardHeader className="pb-4">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground/90">
            Order Frequency
          </CardTitle>
          <CardDescription className="text-[11px] text-muted-foreground mt-0.5">
            Total computational invoicing tracking volumes.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig} className="h-60 w-full">
            <BarChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} className="text-[10px] fill-muted-foreground" />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-[10px] fill-muted-foreground" allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="orders" fill="hsl(var(--chart-2, 210 100% 50%))" radius={[4, 4, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  );
}