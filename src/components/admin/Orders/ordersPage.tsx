"use client";

import { useState } from "react";
import { OrderType, OrderStatus } from "@/types/OrderTypes";
import OrderMetrics from "./order-metrics";
import OrdersTable from "./orders-table";
import OrderDetailsDialog from "./order-details-dialog";
import { toast } from "sonner";
import axios from "axios";

interface OrdersPageProps {
  initialOrders: OrderType[];
}

export default function OrdersPage({ initialOrders }: OrdersPageProps) {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

const handleStatusChange = async (
  orderId: string,
  newStatus: OrderStatus,
) => {
  // 1. Rollback ke liye purani state ka backup
  const previousOrdersState = [...orders];

  // 2. Optimistic Update: UI ko instantly badlein
  setOrders((prev) =>
    prev.map((order) =>
      order._id === orderId ? { ...order, status: newStatus } : order,
    ),
  );

  try {
    // 3. Axios PATCH Request
    await axios.patch("/api/admin/updateOrderStatus", {
      orderId,
      status: newStatus, 
    });

    // 4. Success Toast Notification
    toast.success(
      `Order #${orderId.substring(18)} successfully transitioned to [${newStatus.toUpperCase()}]`,
    );
  } catch (err: any) {
    console.error("API Error status sync failed:", err);

    // 5. Rollback UI State if API fails
    setOrders(previousOrdersState);

    // 6. Extract custom error message from backend response securely
    const errorMessage = 
      err.response?.data?.message || 
      "Pipeline sync failure. Rolled back order state modifications.";

    // Error Notification
    toast.error(errorMessage);
  }
};
  const handleViewDetails = (order: OrderType) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen text-foreground">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Order Architecture
        </h1>
        <p className="text-muted-foreground text-xs md:text-sm">
          Track lifecycle transaction stages, audit invoices, and update
          logistics telemetry records.
        </p>
      </div>

      {/* COMPONENT 1: METRICS LAYER (ROW 1 & ROW 2) */}
      <OrderMetrics orders={orders} />

      {/* COMPONENT 2: TABLE DATA ENGINE */}
      <OrdersTable
        orders={orders}
        onStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
      />

      {/* COMPONENT 3: SPECIFICATION SPEC SHEET OVERLAY */}
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
