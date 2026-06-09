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
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(
    null,
  );
  const [products, setProducts] = useState<ProductTypes[]>(Products);
  const handleRefetch = async () => {
    const newProducts = await getProducts();
    setProducts(newProducts);
  };
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">Products</h1>

        <div className="space-y-2 bg-card border border-border rounded-lg">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-secondary/50"
            >
              <div className="flex items-center gap-4 flex-1">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 mr-4">
                <p className="text-sm text-muted-foreground">
                  Stock: {product.stock}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.isFeatured ? "Featured" : "Not Featured"}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedProduct(product);
                    setOpen(true);
                  }}
                  size="sm"
                  variant="ghost"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <DeleteConfirm
                  product={product}
                  onConfirm={handleRefetch}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
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
