"use client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductTypes } from "@/types/ProductTypes";
import EditInventoryItem from "@/components/admin/inventory/EditInventoryItem";
import DeleteConfirm from "@/components/admin/inventory/DeleteConfirm";
import { getProducts } from "@/lib/getProducts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductsList = ({ Products }: { Products: ProductTypes[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(null);
  const [products, setProducts] = useState<ProductTypes[]>(Products);
  const [open, setOpen] = useState<boolean>(false);

  const handleRefetch = async () => {
    const newProducts = await getProducts();
    setProducts(newProducts);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Inventory Matrix</h1>
          <p className="text-sm text-muted-foreground">
            Total product: {products.length}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
          {products.map((product, index) => {
            // Calculate dynamic total sum of stock across all active variants
            const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;

            //  Extract unique attributes list directly to fill the center space intelligently
            const colors = product.attributes?.find((a) => a.name === "Color")?.values || [];
            const sizes = product.attributes?.find((a) => a.name === "Size")?.values || [];

            return (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
              >
                {/* LEFT BLOCK: ASSET IMAGE AND BASIC INFORMATION */}
                <div className="flex items-center gap-4 w-70 shrink-0">
                  <div className="relative w-12 h-12 bg-secondary rounded overflow-hidden border border-border">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      priority={index < 4}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <p className="font-medium text-foreground tracking-tight truncate">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{product.category}</p>
                  </div>
                </div>

                {/*CENTER BLOCK: THE EMPTY SPACE FIX (Dynamic Attributes Preview Matrix) */}
                <div className="flex-1 px-8 hidden md:flex items-center gap-6 flex-wrap">
                  {colors.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Colors:</span>
                      <div className="flex gap-1 flex-wrap">
                        {colors.map((c) => (
                          <span key={c} className="text-[10px] px-2 py-0.5 rounded-sm bg-secondary border border-border text-foreground font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {sizes.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">Sizes:</span>
                      <div className="flex gap-1 flex-wrap">
                        {sizes.map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary border border-border text-foreground font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT BLOCK: INVENTORY VALUES AND STRATEGIC ACTIONS CONTROLLER */}
                <div className="flex items-center gap-8 shrink-0">
                  <div className="text-right w-32">
                    <p className={`text-sm font-semibold ${totalStock > 10 ? "text-emerald-500" : totalStock > 0 ? "text-amber-500" : "text-destructive"}`}>
                      {totalStock === 0 ? "Sold Out" : `${totalStock} in stock`}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60 mt-0.5">
                      {product.isFeatured ? "Featured Product" : "Standard"}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      className="cursor-pointer hover:bg-emerald-500/10 hover:text-emerald-500"
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpen(true);
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <Pencil className="w-4 h-4 text-emerald-600" />
                    </Button>
                    <DeleteConfirm product={product} onConfirm={handleRefetch} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* DIALOG CONTROLLER MATRIX */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="tracking-tight">Modify Inventory Configurations</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <EditInventoryItem
              product={selectedProduct}
              onClose={() => setOpen(false)}
              onConfirm={handleRefetch}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsList;