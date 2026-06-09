"use client";

import { OrderType } from "@/types/OrderTypes";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OrderDetailsDialogProps {
  order: OrderType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderDetailsDialog({ order, isOpen, onOpenChange }: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border  text-foreground shadow-lg overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Order Specification Blueprint</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs break-all block w-full mt-1">
            Stripe Transaction ID: {order.stripeSessionId}
          </DialogDescription>
        </DialogHeader>


        <div className="space-y-6 pt-3 w-full max-w-full overflow-x-hidden">
          {/* Customer Logistics Frame */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-border p-4 rounded-lg bg-secondary/20 w-full">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Customer Profile</h4>
              <p className="text-sm font-semibold">{order.shippingAddress.fullName}</p>
              <p className="text-xs text-muted-foreground break-all">{order.userEmail}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Shipping Destination</h4>
              <p className="text-xs text-muted-foreground leading-relaxed wrap-break-word">{order.shippingAddress.street}</p>
              <p className="text-xs font-medium mt-1 text-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.zip} | {order.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Product Items Loop */}
          <div className="space-y-2 w-full">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Manifest</h4>
            <div className="border border-border rounded-lg overflow-hidden shadow-sm w-full">
              <div className="grid grid-cols-12 bg-secondary/40 p-2 text-xs font-bold text-muted-foreground border-b border-border">
                <div className="col-span-6">Item Title</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
              {order.items.map((item) => (
                <div key={item._id} className="grid grid-cols-12 p-2.5 text-sm items-center border-b border-border last:border-b-0 hover:bg-secondary/10">
                  <div className="col-span-6 font-medium text-xs md:text-sm text-foreground truncate">{item.name}</div>
                  <div className="col-span-2 text-center text-muted-foreground text-xs">Rs. {item.price}</div>
                  <div className="col-span-2 text-center text-xs font-mono bg-secondary/50 rounded py-0.5 max-w-7 mx-auto">
                    {item.quantity}
                  </div>
                  <div className="col-span-2 text-right font-semibold text-xs md:text-sm">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Total */}
          <div className="flex justify-between items-center border-t border-border pt-4 w-full">
            <span className="text-sm text-muted-foreground font-medium">Total Accounted Capital:</span>
            <span className="text-xl font-extrabold text-emerald-500">
              Rs. {order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}