"use client";

import { OrderType } from "@/types/OrderTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface OrderMetricsProps {
  orders: OrderType[];
}

export default function OrderMetrics({ orders }: OrderMetricsProps) {
  // Calculations based on custom statuses
  const totalRevenue = orders.reduce((acc, order) => {
    return order.status !== "cancelled" ? acc + order.totalAmount : acc;
  }, 0);
  
  const pendingCount = orders.filter(o => o.status === "pending").length;
  const processingCount = orders.filter(o => o.status === "processing").length;
  const deliveredCount = orders.filter(o => o.status === "delivered").length;
  const cancelledCount = orders.filter(o => o.status === "cancelled").length;

  return (
    <div className="space-y-4">
      {/* ROW 1: CORE BUSINESS CAPITAL METRICS */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">Rs. {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Excluding cancelled order vectors</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Total Invoices</CardTitle>
            <ShoppingBag className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">+{orders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total incoming transaction volume</p>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: THE 4 LOGISTICS STATUSES */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card/60">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Pending</p>
              <h3 className="text-2xl font-bold mt-1 text-blue-500">{pendingCount}</h3>
            </div>
            <AlertCircle className="h-5 w-5 text-blue-500/70" />
          </CardContent>
        </Card>

        <Card className="border-border bg-card/60">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Processing</p>
              <h3 className="text-2xl font-bold mt-1 text-amber-500">{processingCount}</h3>
            </div>
            <Clock className="h-5 w-5 text-amber-500/70" />
          </CardContent>
        </Card>

        <Card className="border-border bg-card/60">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Delivered</p>
              <h3 className="text-2xl font-bold mt-1 text-emerald-500">{deliveredCount}</h3>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-500/70" />
          </CardContent>
        </Card>

        <Card className="border-border bg-card/60">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Cancelled</p>
              <h3 className="text-2xl font-bold mt-1 text-destructive">{cancelledCount}</h3>
            </div>
            <XCircle className="h-5 w-5 text-destructive/70" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}