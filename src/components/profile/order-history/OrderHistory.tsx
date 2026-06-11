"use client";

import { useState } from "react";
import { OrderType } from "@/types/OrderTypes";
import OrderHistoryCard from "./order-history-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";

interface OrderHistoryClientProps {
  initialOrders: OrderType[];
}

export default function OrderHistoryClient({ initialOrders }: OrderHistoryClientProps) {
  const [orders] = useState<OrderType[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter orders baseline matching custom telemetry states
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* FILTER TABS */}
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 md:w-150 bg-secondary/40 border border-border p-1">
          <TabsTrigger value="all" className="text-xs uppercase font-semibold">All</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs uppercase font-semibold">Pending</TabsTrigger>
          <TabsTrigger value="processing" className="text-xs uppercase font-semibold">Processing</TabsTrigger>
          <TabsTrigger value="delivered" className="text-xs uppercase font-semibold">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled" className="text-xs uppercase font-semibold">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* RENDER CHUNKS */}
      {filteredOrders.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3 bg-card/40">
          <div className="p-3 bg-secondary/50 rounded-full text-muted-foreground">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm md:text-base">No orders found</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              You do not have any pipeline transactions logged under the status [{activeTab.toUpperCase()}].
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderHistoryCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}