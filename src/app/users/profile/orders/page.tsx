import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OrderHistoryClient from "@/components/profile/order-history/OrderHistory";

// Fake structural type matching standard order blueprint
import { OrderType } from "@/types/OrderTypes";

const fetchUserOrders = async (userEmail: string): Promise<OrderType[]> => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/user/getUserOrders/${userEmail}`
    )
    const data = await res.json()
    return data.orders
  } catch (error) {
    console.error("Database query exception on user orders manifest:", error);
    return [];
  }
};

export default async function OrderHistoryPage() {
  const session = await auth();

  // Authentication shield guard
  if (!session || !session.user?.email) {
    redirect("/auth/login");
  }

  const orders = await fetchUserOrders(session.user.email);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-background text-foreground">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground text-sm">
          Track telemetry updates, monitor current shipments, and review
          lifetime invoice data.
        </p>
      </div>

      <OrderHistoryClient initialOrders={orders} />
    </div>
  );
}
