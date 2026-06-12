import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OrderHistoryClient from "@/components/profile/order-history/OrderHistory";
import { OrderType } from "@/types/OrderTypes";
import { Skeleton } from "@/components/ui/skeleton";
import { connectDb } from "@/lib/connectDb"; 
import type { Metadata } from "next";
import { Order } from "@/models/Order"; 


export const metadata: Metadata = {
  title: "Your Order History | Orbit",
  description: "Track active shipments, inspect past invoice statements, and manage your personal purchase history manifest in real-time.",
};


const getUserOrdersDirect = async (userEmail: string): Promise<OrderType[]> => {
  try {
    await connectDb();
    const orders = await Order.find({userEmail}).sort({ createdAt: -1 }).lean();
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

// 3. MAIN SERVER COMPONENT LAYER
export default async function OrderHistoryPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-background text-foreground">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground text-sm">
          Track telemetry updates, monitor current shipments, and review
          lifetime invoice data.
        </p>
      </div>

      <Suspense fallback={<OrderHistorySkeleton />}>
        <OrderHistoryFeed email={session.user.email} />
      </Suspense>
    </div>
  );
}

function OrderHistorySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 border border-border/60 rounded-2xl space-y-3 bg-card/20">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-32 bg-muted/30" />
            <Skeleton className="h-5 w-20 bg-muted/20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-1/2 bg-muted/20" />
          <hr className="border-border/40" />
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-12 w-12 rounded-xl bg-muted/30" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3 bg-muted/20" />
              <Skeleton className="h-3 w-1/4 bg-muted/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}