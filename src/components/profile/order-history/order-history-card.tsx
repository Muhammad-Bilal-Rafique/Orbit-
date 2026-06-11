"use client";

import { OrderType, OrderStatus } from "@/types/OrderTypes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Calendar, ArrowUpRight } from "lucide-react";

interface OrderHistoryCardProps {
  order: OrderType;
}

export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none">Pending</Badge>;
      case "processing":
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-none">Processing</Badge>;
      case "delivered":
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-none">Delivered</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 shadow-none">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border-border bg-card shadow-sm hover:border-muted-foreground/30 transition-all duration-200">
      <CardContent className="p-4 md:p-6 space-y-4">
        
        {/* CARD TOP INFO ROW */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <div>
              <p className="text-muted-foreground font-medium">Order Identification Token</p>
              <p className="font-mono font-bold mt-0.5 text-foreground">#{order._id.substring(14).toUpperCase()}</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-border" />
            <div className="hidden sm:block">
              <p className="text-muted-foreground font-medium">Date Placed</p>
              <p className="font-semibold mt-0.5 text-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div>{getStatusBadge(order.status as OrderStatus)}</div>
        </div>

        {/* ITEMS ITERATION BOX */}
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item._id} className="flex items-center justify-between text-sm py-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-secondary/50 text-muted-foreground hidden sm:block">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Quantity Vector: {item.quantity} Pcs</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER METRIC TOTAL */}
        <div className="flex items-center justify-between pt-4 border-t border-border bg-secondary/10 -mx-4 -mb-4 p-4 md:-mx-6 md:-mb-6 rounded-b-xl">
          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Fulfilled via Stripe Secure Checkout</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground font-medium mr-1.5">Net Total:</span>
            <span className="text-lg font-extrabold text-foreground">Rs. {order.totalAmount.toLocaleString()}</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}