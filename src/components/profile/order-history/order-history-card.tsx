"use client";

import { useState } from "react";
import { OrderType, OrderStatus } from "@/types/OrderTypes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Box, Truck, Home, Check } from "lucide-react";
import OrderReview from "./OrderReview";

interface OrderHistoryCardProps {
  order: OrderType;
}

export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const [hasBeenReviewed, setHasBeenReviewed] = useState(order.isReviewed);

  const statusMilestones: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];
  const currentStatusIndex = statusMilestones.indexOf(order.status as OrderStatus);
  const isOrderCancelled = order.status === "cancelled";
  
  const getMilestoneLabel = (status: OrderStatus) => {
    switch (status) {
      case "pending": return "Pending";
      case "processing": return "Processing";
      case "shipped": return "Shipped";
      case "delivered": return "Delivered";
      default: return status;
    }
  };

  const getMilestoneIcon = (status: OrderStatus, className: string) => {
    switch (status) {
      case "pending": return <ClipboardList className={className} strokeWidth={1.5} />;
      case "processing": return <Box className={className} strokeWidth={1.5} />;
      case "shipped": return <Truck className={className} strokeWidth={1.5} />;
      case "delivered": return <Home className={className} strokeWidth={1.5} />;
      default: return <Box className={className} strokeWidth={1.5} />;
    }
  };

  const getProgressWidthClass = (index: number) => {
    if (index <= 0) return "w-0";
    if (index === 1) return "w-1/3";
    if (index === 2) return "w-2/3";
    return "w-full";
  };

  return (
    <Card className="border-border bg-card shadow-xs hover:border-border/80 transition-all duration-300 font-sans rounded-2xl overflow-hidden w-full">
      <CardContent className="p-5 md:p-6 space-y-6 w-full">
        
        {/* ROW 1: HEADER CONTROLS METADATA */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4 w-full">
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Order Token</p>
              <p className="font-mono font-bold mt-0.5 text-foreground">
                #{order._id.substring(14).toUpperCase()}
              </p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-border/40" />
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Date Placed</p>
              <p className="font-semibold mt-0.5 text-foreground/90">
                {new Date(order.createdAt).toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div>
            <Badge className={`shadow-none border rounded-full font-semibold tracking-wide text-[11px] uppercase py-0.5 px-3 ${
              order.status === "delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
              order.status === "cancelled" ? "bg-destructive/10 text-destructive border-destructive/20" :
              "bg-primary/10 text-primary border-primary/20"
            }`}>
              {order.status}
            </Badge>
          </div>
        </div>

        {/* PRODUCTS LOOP SECTIONS */}
        <div className="space-y-4 w-full">
          {order.items.map((item) => (
            <div
              key={item._id || item.productId}
              className="flex flex-col sm:flex-row sm:items-center justify-between text-sm py-1 gap-2 border-b border-border/20 last:border-0 pb-3 last:pb-0 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-secondary/40 text-muted-foreground hidden sm:block border border-border/40">
                  <Box className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-foreground/90 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    Quantity Vector: {item.quantity} Pcs {item.color || item.size ? `• ${item.color || ""}/${item.size || ""}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 mt-1 sm:mt-0 shrink-0">
                <p className="font-bold text-foreground">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>

                {order.status === "delivered" &&
                  (hasBeenReviewed ? (
                    <span className="text-[10px] uppercase bg-secondary/60 border border-border text-muted-foreground px-2 py-0.5 rounded-md font-bold tracking-wider">
                      Reviewed
                    </span>
                  ) : (
                    <OrderReview
                      productId={item.productId}
                      productName={item.name}
                      orderId={order._id}
                      onReviewSuccess={() => setHasBeenReviewed(true)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: FINANCIAL METRICS ACCOUNTING */}
        <div className="flex items-center justify-between pt-1 border-t border-border/20 w-full">
          <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fulfilled via Stripe Secure Node</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground font-medium mr-1">Net Total:</span>
            <span className="text-base font-black text-foreground tracking-tight">
              Rs. {order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* ROW 3: PREMIUM UNIFORM COMPLIANCE TIMELINE STEPPER */}
        {!isOrderCancelled ? (
          <div className="pt-6 border-t border-border/40 max-w-4xl mx-auto px-2 w-full">
            
            {/* TIMELINE PROGRESS LINE CONTAINER */}
            <div className="relative w-full h-1 bg-secondary border border-border/10 rounded-full mb-6">
              <div className={`absolute top-0 left-0 h-full bg-green-600 rounded-full transition-all duration-700 ease-out ${getProgressWidthClass(currentStatusIndex)}`} />

              {/* STEP BUBBLES */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between w-full">
                {statusMilestones.map((milestone, index) => {
                  const isActive = index <= currentStatusIndex;
                  return (
                    <div 
                      key={milestone} 
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 border-2 text-xs ${
                        isActive 
                          ? "bg-green-600 border-gray-500 text-primary-foreground shadow-sm shadow-primary/20" 
                          : "bg-background border-border text-muted-foreground/40"
                      }`}
                    >
                      {isActive ? (
                        <Check className="w-3 h-3 stroke-3" />
                      ) : (
                        <div className="w-1 h-1 bg-border rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TIMELINE LABELS */}
            <div className="grid grid-cols-4 gap-2 w-full pt-1">
              {statusMilestones.map((milestone, index) => {
                const isActive = index <= currentStatusIndex;
                return (
                  <div key={milestone} className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5 text-center md:text-left flex-1">
                    {getMilestoneIcon(
                      milestone, 
                      `w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                        isActive ? "text-foreground/90" : "text-muted-foreground/30"
                      }`
                    )}
                    <div className="flex flex-col">
                      <p className={`text-[9px] md:text-xs font-bold leading-tight tracking-tight uppercase max-w-16 md:max-w-none ${
                        isActive ? "text-foreground" : "text-muted-foreground/40"
                      }`}>
                        {getMilestoneLabel(milestone)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          <div className="pt-4 border-t border-border/40 text-center w-full">
            <p className="text-[10px] font-bold text-destructive/80 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-ping" />
              This tracking telemetry flow has been terminated
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}