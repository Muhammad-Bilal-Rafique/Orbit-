import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OrderHistoryClient from "@/components/profile/order-history/OrderHistory";
import { OrderType } from "@/types/OrderTypes";
import { connectDb } from "@/lib/connectDb"; 
import type { Metadata } from "next";
import { Order } from "@/models/Order"; 
import { MotionView, MotionItem } from "@/components/shared/motion-view";

export const metadata: Metadata = {
  title: "Your Order History | Orbit",
  description: "Track active shipments, inspect past invoice statements, and manage your personal purchase history manifest in real-time.",
};

const getUserOrdersDirect = async (userEmail: string): Promise<OrderType[]> => {
  try {
    await connectDb();
    const orders = await Order.find({ userEmail }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Database query exception on user orders manifest:", error);
    return [];
  }
};

async function OrderHistoryFeed({ email }: { email: string }) {
  const orders = await getUserOrdersDirect(email);
  return <OrderHistoryClient initialOrders={orders} />;
}

export default async function OrderHistoryPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-background text-foreground overflow-hidden">
      <MotionView stagger={0.1}>
        <MotionItem>
          <div className="flex flex-col gap-1 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">Your Orders</h1>
            <p className="text-muted-foreground text-sm">
              Track telemetry updates, monitor current shipments, and review lifetime invoice data.
            </p>
          </div>
        </MotionItem>

        <MotionItem className="w-full">
          <OrderHistoryFeed email={session.user.email} />
        </MotionItem>
      </MotionView>
    </div>
  );
}