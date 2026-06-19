import OrdersPage from "@/components/admin/Orders/ordersPage";
import { Order } from "@/models/Order";
import { connectDb } from "@/lib/connectDb";
import { OrderType } from "@/types/OrderTypes";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Order Management | Orbit",
  description: "Track active shipments, inspect past invoice statements, and manage your personal purchase history manifest in real-time.",
};

const getOrdersDirect = async (): Promise<OrderType[]> => {
  try {
    await connectDb();
    
    
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    if (!orders) return [];

    
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
};

export default async function AdminOrderPage() {
  
  const orders = await getOrdersDirect();
  return <OrdersPage initialOrders={orders} />;
}