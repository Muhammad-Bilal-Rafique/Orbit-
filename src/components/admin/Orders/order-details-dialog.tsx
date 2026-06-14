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
      <DialogContent className="bg-card border-border text-foreground shadow-lg overflow-hidden max-w-xl font-sans">
        <DialogHeader>
          {/* Clean S-Rank Brand Headings */}
          <DialogTitle className="text-lg font-semibold tracking-tight">Order Details</DialogTitle>
          <DialogDescription className="text-muted-foreground text-[11px] font-mono break-all block w-full mt-1">
            ID: {order.stripeSessionId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2 w-full max-w-full overflow-x-hidden">
          {/* Customer & Shipping Row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border p-4 rounded-lg bg-secondary/20 w-full">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Customer</h4>
              <p className="text-sm font-medium text-foreground">{order.shippingAddress?.fullName}</p>
              <p className="text-xs text-muted-foreground break-all mt-0.5">{order.userEmail}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Shipping Address</h4>
              <p className="text-xs text-muted-foreground leading-relaxed wrap-break-word">{order.shippingAddress?.street}</p>
              <p className="text-xs font-medium mt-1 text-foreground">
                {order.shippingAddress?.city}, {order.shippingAddress?.zip} | {order.shippingAddress?.country}
              </p>
            </div>
          </div>

          {/* Items Table Manifest */}
          <div className="space-y-2 w-full">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Items Ordered</h4>
            <div className="border border-border rounded-lg overflow-hidden shadow-sm w-full bg-card">
              
              {/* TABLE HEADER */}
              <div className="grid grid-cols-12 bg-secondary/50 p-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* DATA ROWS LOOP */}
              {order.items?.map((item: any) => (
                <div key={item._id} className="grid grid-cols-12 p-3 text-sm items-center border-b border-border last:border-b-0 hover:bg-secondary/10 transition-colors">
                  
                  {/* Item Name + Dynamic Variant Indicators */}
                  <div className="col-span-6 space-y-1 pr-2">
                    <p className="font-medium text-xs md:text-sm text-foreground truncate">{item.name}</p>
                    {/*  Injected Size & Color indicators inside style notes */}
                    <div className="flex gap-1.5 items-center flex-wrap">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border/40">
                        {item.color}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border/40">
                        Size {item.size}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-muted-foreground font-mono text-xs">${item.price}</div>
                  <div className="col-span-2 text-center text-xs font-mono text-foreground">
                    {item.quantity}
                  </div>
                  <div className="col-span-2 text-right font-semibold text-xs md:text-sm text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Financial Summary Bar */}
          <div className="flex justify-between items-center border-t border-secondary pt-4 w-full">
            <span className="text-xs text-muted-foreground tracking-widest font-bold">TOTAL AMOUNT PAID</span>
            <span className="text-lg font-bold text-green-500">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}