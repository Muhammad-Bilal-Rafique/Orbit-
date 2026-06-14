"use client";

import { OrderType, OrderStatus } from "@/types/OrderTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface OrdersTableProps {
  orders: OrderType[];
  onStatusChange: (id: string, status: OrderStatus) => void;
  onViewDetails: (order: OrderType) => void;
}

export default function OrdersTable({
  orders,
  onStatusChange,
  onViewDetails,
}: OrdersTableProps) {
  // Clean, high-contrast visual status indicators setup
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none hover:bg-blue-500/10">
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-none hover:bg-amber-500/10">
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-none hover:bg-purple-500/10">
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-none hover:bg-emerald-500/10">
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 shadow-none hover:bg-destructive/10">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="shadow-none">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="border-border bg-card shadow-sm rounded-lg overflow-hidden font-sans">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-24 font-bold text-[10px] uppercase tracking-wider">
                Order ID
              </TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-wider w-32">
                Date
              </TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-wider">
                Customer
              </TableHead>
              {/* Increased layout span space to handle detail specs inline */}
              <TableHead className="font-bold text-[10px] uppercase tracking-wider w-70">
                Items & Styles
              </TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-wider">
                Amount
              </TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-wider text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-sm text-muted-foreground"
                >
                  No orders found in this catalog view.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order._id}
                  className="border-border hover:bg-secondary/10 transition-colors"
                >
                  {/* Hex identification block code */}
                  <TableCell className="font-mono text-xs font-bold text-foreground">
                    #{order._id.substring(18)}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground font-medium">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-xs font-medium text-foreground max-w-37 truncate">
                    {order.userEmail}
                  </TableCell>

                  {/* VARIANTS PREVIEW BAR */}
                  <TableCell>
                    <div className="space-y-1.5 py-1">
                      {order.items?.map((item: any, i) => (
                        <div
                          key={item._id || i}
                          className="text-xs flex items-center gap-1.5 flex-wrap"
                        >
                          <span className="font-medium text-foreground truncate max-w-35 block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight px-1 bg-secondary border border-border/60 rounded-[3px]">
                            {item.color} / {item.size}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground/70">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* Currency standardized token display sync */}
                  <TableCell className="font-semibold text-xs md:text-sm text-foreground">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>

                  <TableCell>
                    {getStatusBadge(order.status as OrderStatus)}
                  </TableCell>

                  <TableCell className="text-right flex items-center justify-end gap-2 py-3">
                    <Select
                      value={order.status}
                      // ⚡ Removed the invalid 'onStatusChange' line that caused the error
                      onValueChange={(value) =>
                        onStatusChange(order._id, value as OrderStatus)
                      }
                    >
                      <SelectTrigger className="w-28 h-8 text-xs border-border bg-background shadow-none focus:ring-0">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="border-border bg-popover text-foreground">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 border-border hover:bg-secondary/80 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onViewDetails(order)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
