"use client";

import { OrderType, OrderStatus } from "@/types/OrderTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface OrdersTableProps {
  orders: OrderType[];
  onStatusChange: (id: string, status: OrderStatus) => void;
  onViewDetails: (order: OrderType) => void;
}

export default function OrdersTable({ orders, onStatusChange, onViewDetails }: OrdersTableProps) {
  
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/10">Pending</Badge>;
      case "processing":
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/10">Processing</Badge>;
      case "delivered":
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10">Delivered</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow className="border-border">
              <TableHead className="w-25 font-semibold">Order ID</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Customer Email</TableHead>
              <TableHead className="font-semibold">Items</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No pipeline orders captured.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id} className="border-border hover:bg-secondary/10 transition-colors">
                  <TableCell className="font-mono text-xs font-bold">
                    #{order._id.substring(18)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-PK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{order.userEmail}</TableCell>
                  <TableCell className="text-sm">
                    {order.items.reduce((total, item) => total + item.quantity, 0)} Pcs
                  </TableCell>
                  <TableCell className="font-bold text-sm">Rs. {order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(order.status as OrderStatus)}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2.5 py-3">
                    <Select
                      value={order.status}
                      onValueChange={(value) => onStatusChange(order._id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-31 h-8 text-xs border-border bg-background">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="border-border bg-popover text-foreground">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 border-border hover:bg-secondary/80"
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