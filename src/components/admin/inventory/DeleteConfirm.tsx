"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react"; 
import { ProductTypes } from "@/types/ProductTypes";
import axios from "axios";
import { toast } from "sonner";

const DeleteConfirm = ({ product, onConfirm }: { product: ProductTypes; onConfirm: () => void }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true); 
    try {
      await axios.delete(`/api/admin/deleteProduct/${product._id}`);
      
      toast.success("Product successfully deleted.");
      
      onConfirm();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete product. Please try again."); 
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button className="cursor-pointer" size="sm" variant="ghost" onClick={() => setOpen(true)}>
        <Trash2 className="w-4 h-4 text-red-800 cursor-pointer" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <span className="font-bold">{product.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={isDeleting} 
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting} 
                className="flex items-center justify-center gap-2 min-w-17"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteConfirm;