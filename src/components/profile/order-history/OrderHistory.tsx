"use client";

import { useState } from "react";
import { OrderType } from "@/types/OrderTypes";
import OrderHistoryCard from "./order-history-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";
import { MotionView, MotionItem } from "@/components/shared/motion-view";
import { AnimatePresence, motion } from "framer-motion";

interface OrderHistoryClientProps {
  initialOrders: OrderType[];
}

export default function OrderHistoryClient({ initialOrders }: OrderHistoryClientProps) {
  const [orders] = useState<OrderType[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <div className="space-y-6 w-full">
      
      {/* FILTER TABS ROUTER */}
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 md:w-150 bg-secondary/40 border border-border p-1 rounded-xl">
          <TabsTrigger value="all" className="text-[10px] md:text-xs uppercase font-semibold cursor-pointer">All</TabsTrigger>
          <TabsTrigger value="pending" className="text-[10px] md:text-xs uppercase font-semibold cursor-pointer">Pending</TabsTrigger>
          <TabsTrigger value="processing" className="text-[10px] md:text-xs uppercase font-semibold cursor-pointer">Processing</TabsTrigger>
          <TabsTrigger value="shipped" className="text-[10px] md:text-xs uppercase font-semibold cursor-pointer">Shipped</TabsTrigger>
          <TabsTrigger value="delivered" className="text-[10px] md:text-xs uppercase font-semibold cursor-pointer">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled" className="text-[10px] md:text-xs uppercase font-semibold cursor-pointer">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* RENDER CONTROLLER CHUNKS WITH LAYOUT TRANSITIONS */}
      <div className="w-full relative min-h-75">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length === 0 ? (
            <motion.div
              key={`empty-${activeTab}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="border border-dashed border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3 bg-card/40 w-full"
            >
              <div className="p-3 bg-secondary/50 rounded-full text-muted-foreground">
                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm md:text-base">No orders found</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  You do not have any pipeline transactions logged under the status [{activeTab.toUpperCase()}].
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={`grid-${activeTab}`}
              className="space-y-4 w-full"
              layout
            >
              {filteredOrders.map((order) => (
                <motion.div
                  key={order._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <OrderHistoryCard order={order} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}