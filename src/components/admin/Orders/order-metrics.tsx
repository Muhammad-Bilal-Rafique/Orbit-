"use client";

import { OrderType, OrderStatus } from "@/types/OrderTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Clock, CheckCircle2, XCircle, AlertCircle, Truck } from "lucide-react";

interface OrderMetricsProps {
  orders: OrderType[];
}

export default function OrderMetrics({ orders }: OrderMetricsProps) {
  // 💸 1. CALCULATE REVENUE SAFELY: Accumulate capital only from active sales flows
  const totalRevenue = orders.reduce((acc, order) => {
    return order.status !== "cancelled" ? acc + order.totalAmount : acc;
  }, 0);
  
  // 📦 2. QUANTITY SUMMARY METRICS BY PIPELINE NODES
  const pendingCount = orders.filter(o => o.status === "pending").length;
  const processingCount = orders.filter(o => o.status === "processing").length;
  const shippedCount = orders.filter(o => o.status === "shipped").length; // 🔥 Added missing shipped pipeline
  const deliveredCount = orders.filter(o => o.status === "delivered").length;
  const cancelledCount = orders.filter(o => o.status === "cancelled").length;

  return (
    <div className="space-y-4 font-sans">
      
      {/* ROW 1: CORE BUSINESS CAPITAL METRICS */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card shadow-sm rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
            <CardTitle className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">${totalRevenue.toFixed(2)}</div>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Excludes cancelled transactions</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
            <CardTitle className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">+{orders.length}</div>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Lifetime overall checkout volume</p>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: THE 5 PIPELINE STATUSES (Symmetrical layout wrapper) */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        
        {/* A. PENDING CARD */}
        <Card className="border-border bg-card/40 rounded-lg shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Pending</p>
              <h3 className="text-xl font-bold tracking-tight mt-0.5 text-blue-500">{pendingCount}</h3>
            </div>
            <AlertCircle className="h-4 w-4 text-blue-500/60 shrink-0" />
          </CardContent>
        </Card>

        {/* B. PROCESSING CARD */}
        <Card className="border-border bg-card/40 rounded-lg shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Processing</p>
              <h3 className="text-xl font-bold tracking-tight mt-0.5 text-amber-500">{processingCount}</h3>
            </div>
            <Clock className="h-4 w-4 text-amber-500/60 shrink-0" />
          </CardContent>
        </Card>

        {/* C. SHIPPED CARD (Injected real-time tracking badge block) */}
        <Card className="border-border bg-card/40 rounded-lg shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Shipped</p>
              <h3 className="text-xl font-bold tracking-tight mt-0.5 text-purple-500">{shippedCount}</h3>
            </div>
            <Truck className="h-4 w-4 text-purple-500/60 shrink-0" />
          </CardContent>
        </Card>

        {/* D. DELIVERED CARD */}
        <Card className="border-border bg-card/40 rounded-lg shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Delivered</p>
              <h3 className="text-xl font-bold tracking-tight mt-0.5 text-emerald-500">{deliveredCount}</h3>
            </div>
            <CheckCircle2 className="h-4 w-4 text-emerald-500/60 shrink-0" />
          </CardContent>
        </Card>

        {/* E. CANCELLED CARD */}
        <Card className="border-border bg-card/40 rounded-lg shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Cancelled</p>
              <h3 className="text-xl font-bold tracking-tight mt-0.5 text-destructive">{cancelledCount}</h3>
            </div>
            <XCircle className="h-4 w-4 text-destructive/60 shrink-0" />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}