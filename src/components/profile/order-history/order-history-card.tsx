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

  // 🛰️ Strict chronological alignment matrix mapping
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
      case "pending": return <ClipboardList className={className} />;
      case "processing": return <Box className={className} />;
      case "shipped": return <Truck className={className} />;
      case "delivered": return <Home className={className} />;
      default: return <Box className={className} />;
    }
  };

  // Dynamic width calculator matrix for the progress bar line fill
  const getProgressWidthClass = (index: number) => {
    if (index === 0) return "w-0";
    if (index === 1) return "w-1/3";
    if (index === 2) return "w-2/3";
    return "w-full";
  };

  return (
    <Card className="border-border bg-card shadow-xs hover:border-muted-foreground/20 transition-all duration-200 font-sans">
      <CardContent className="p-5 md:p-6 space-y-6">
        
        {/* ================= ROW 1: HEADER CONTROLS METADATA ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <div>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Order Identification Token</p>
              <p className="font-mono font-bold mt-0.5 text-foreground">
                #{order._id.substring(14).toUpperCase()}
              </p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-border" />
            <div>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Date Placed</p>
              <p className="font-semibold mt-0.5 text-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div>
            <Badge className={`shadow-none border capitalize ${
              order.status === "delivered" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
              order.status === "cancelled" ? "bg-destructive/10 text-destructive border-destructive/20" :
              "bg-primary/10 text-primary border-primary/20"
            }`}>
              {order.status}
            </Badge>
          </div>
        </div>

        {/* PRODUCTS LOOP SECTIONS */}
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item._id || item.productId}
              className="flex flex-col sm:flex-row sm:items-center justify-between text-sm py-1 gap-2 border-b border-border/30 last:border-0 pb-3 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-secondary/50 text-muted-foreground hidden sm:block border border-border/40">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Quantity Vector: {item.quantity} Pcs {item.color || item.size ? `• ${item.color || ""}/${item.size || ""}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 mt-1 sm:mt-0">
                <p className="font-bold text-foreground">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>

                {order.status === "delivered" &&
                  (hasBeenReviewed ? (
                    <span className="text-[11px] bg-secondary border border-border text-muted-foreground px-2 py-0.5 rounded font-medium tracking-wide">
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

        {/* ================= ROW 2: FINANCIAL METRICS ACCOUNTING ================= */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
            <span>Fulfilled via Stripe Secure Checkout Node</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground font-medium mr-1">Net Total:</span>
            <span className="text-base font-black text-foreground">
              Rs. {order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* ================= ROW 3: PREMIUM IMAGE-MATCHED TIMELINE STEPPER ================= */}
        {!isOrderCancelled ? (
          <div className="pt-6 border-t border-border/40 max-w-4xl mx-auto px-4">
            
            {/* 🛑 THE STEPPER LINE CONTAINER BAR */}
            <div className="relative w-full h-[6px] bg-indigo-100 rounded-full mb-6">
              {/* Dynamic Purple Active Progress Bar Line Fill */}
              <div className={`absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out ${getProgressWidthClass(currentStatusIndex)}`} />

              {/* BUBBLE OVERLAYS AT TARGET NODES MAPPING */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between w-full">
                {statusMilestones.map((milestone, index) => {
                  const isActive = index <= currentStatusIndex;
                  return (
                    <div 
                      key={milestone} 
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                        isActive 
                          ? "bg-indigo-600 border-indigo-600 text-white" 
                          : "bg-white border-indigo-200 text-indigo-300"
                      }`}
                    >
                      {isActive ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 🛑 THE CONTEXTUAL ICONS & LABELS DESC GRID */}
            <div className="grid grid-cols-4 gap-2 w-full pt-1">
              {statusMilestones.map((milestone, index) => {
                const isActive = index <= currentStatusIndex;
                return (
                  <div key={milestone} className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center md:text-left flex-1">
                    {/* Big Content Status Icon */}
                    {getMilestoneIcon(
                      milestone, 
                      `w-7 h-7 md:w-8 md:h-8 transition-colors duration-300 ${
                        isActive ? "text-slate-700" : "text-slate-300 opacity-40"
                      }`
                    )}
                    {/* Informative Step Text labels */}
                    <div className="flex flex-col">
                      <p className={`text-[10px] md:text-xs font-bold leading-tight tracking-tight max-w-[85px] md:max-w-none ${
                        isActive ? "text-slate-800" : "text-slate-300 opacity-40"
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
          <div className="pt-2 border-t border-border/40 text-center">
            <p className="text-xs font-medium text-destructive/80 tracking-wide uppercase flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-ping" />
              This tracking telemetry flow has been terminated
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}