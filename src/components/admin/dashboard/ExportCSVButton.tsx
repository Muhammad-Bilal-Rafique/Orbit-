"use client";

import { OrderType } from "@/types/OrderTypes";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportCSVButtonProps {
  orders: OrderType[];
}

export default function ExportCSVButton({ orders }: ExportCSVButtonProps) {
  
  const formatMeaningfulDate = (isoString: string) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleExportMatrix = () => {
    //  1. Isolation logic: Filter only successful business distributions
    const deliveredOrders = orders.filter((order) => order.status === "delivered");

    if (deliveredOrders.length === 0) {
      alert("No delivered sales records found within the selected calendar boundaries.");
      return;
    }

    // 2. Column Headers Matrix Blueprint
    const headers = [
      "Order ID",
      "Date & Time",
      "Customer Email",
      "Buyer Name",
      "Gross Revenue ($)",
      "Purchased Items Spec",
      "Shipping Coordinates"
    ];

    //  3. Transform JSON documents array directly into sequential text strings
    const rows = deliveredOrders.map((order) => {
      const itemsSpec = order.items
        ?.map((item) => `${item.name} (${item.color || "Standard"}-${item.size || "N/A"}) x${item.quantity}`)
        .join(" | ") || "No Items Data";

      // FIX SHIPPING DETAILS LOGIC: Safe fallback maps to extract nested schema parameters strictly
      const shippingObj = order.shippingAddress;
      let cleanAddress = "N/A";
      let buyerName = "Guest Customer";

      if (shippingObj) {
        buyerName = shippingObj.fullName || "Guest Customer";
        
        // Formulate a clean flat single line layout text mapping for Excel sheets grid parameters
        const street = shippingObj.street || "";
        const city = shippingObj.city || "";
        const state = shippingObj.state || "";
        const zip = shippingObj.zip || "";
        const country = shippingObj.country || "";
        
        cleanAddress = `"${street}, ${city}, ${state} ${zip}, ${country}"`
          .replace(/\s+/g, ' ')
          .trim();
      }

      return [
        order._id,
        `"${formatMeaningfulDate(order.createdAt)}"`,
        order.userEmail,
        `"${buyerName}"`,
        Number(order.totalAmount).toFixed(2),
        `"${itemsSpec}"`, 
        cleanAddress
      ];
    });

    // 4. Core Compilation Composition
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    //5. Execute Instant Blob Local Memory File Delivery
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const transientLink = document.createElement("a");
    
    const fileTimestamp = new Date().toISOString().split("T")[0];
    transientLink.href = url;
    transientLink.setAttribute("download", `orbit_sales_report_${fileTimestamp}.csv`);
    
    document.body.appendChild(transientLink);
    transientLink.click();
    
    // Resource clean up management cycles
    document.body.removeChild(transientLink);
    URL.revokeObjectURL(url);
  };

  return (
    <Button 
      onClick={handleExportMatrix}
      className="bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground font-sans text-xs uppercase font-medium tracking-wider h-9 px-4 gap-2 rounded-md shadow-xs transition-all"
    >
      <Download className="w-3.5 h-3.5" />
      Export Sales Report
    </Button>
  );
}