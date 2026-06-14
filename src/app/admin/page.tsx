import { Metadata } from "next";
import { connectDb } from "@/lib/connectDb";
import { Order } from "@/models/Order";
import OrderMetrics from "@/components/admin/Orders/order-metrics";
import AnalyticsCharts from "@/components/admin/dashboard/AnalyticsCharts";
import TopProductsLeaderboard from "@/components/admin/dashboard/TopProductsLeaderboard";
import DateRangePicker from "@/components/admin/dashboard/DateRangePicker";
import ExportCSVButton from "@/components/admin/dashboard/ExportCSVButton";

export const metadata: Metadata = {
  title: "Analytics Hub | Orbit Control Panel",
  description:
    "Real-time revenue orchestration pipelines and transactional volume charts.",
};

async function getDashboardDataTracer(from?: string, to?: string) {
  try {
    await connectDb();

    const now = new Date();
    let startDate = new Date(now.getFullYear(), 0, 1);
    let endDate = new Date();

    if (from && from.trim() !== "") {
      startDate = new Date(from);
      startDate.setHours(0, 0, 0, 0);
    }
    if (to && to.trim() !== "") {
      endDate = new Date(to);
      endDate.setHours(23, 59, 59, 999);
    }

    const query = {
      createdAt: {
        $gte: new Date(startDate.toISOString()),
        $lte: new Date(endDate.toISOString()),
      },
    };

    const orders = await Order.find(query).sort({ createdAt: 1 }).lean();

    return JSON.parse(JSON.stringify(orders || []));
  } catch (error) {
    return [];
  }
}

interface PageProps {
  searchParams: Promise<{ from?: string; to?: string; timeline?: string }>;
}

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const fromDate = resolvedParams.from;
  const toDate = resolvedParams.to;

  // Fire execution directly on Mongo server context
  const rawOrders = await getDashboardDataTracer(fromDate, toDate);

  return (
   <div className="space-y-8 font-sans p-6 bg-background">
      
      {/* SECTION HEADER BLOCK */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Operational Analytics
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time business performance analytics matrix sorted by targeted calendar ranges.
          </p>
        </div>
        
        {/* 🛸 HIGH-END CONTROLLER OPERATIONS GRIDS */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 🔥 DYNAMIC ACTION BUTTON CHANNEL */}
          <ExportCSVButton orders={rawOrders} />
          
          <DateRangePicker />
          <div className="text-[10px] bg-secondary border border-border text-muted-foreground font-mono px-2.5 py-1 rounded whitespace-nowrap">
            Live Data Engine
          </div>
        </div>
      </div>

      {/* Grid Elements Allocation Components */}
      <OrderMetrics orders={rawOrders} />

      <AnalyticsCharts orders={rawOrders} />

      <TopProductsLeaderboard orders={rawOrders} />

    </div>
  );
}
