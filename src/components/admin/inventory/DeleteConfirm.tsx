"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {ProductTypes} from "@/types/ProductTypes";
import axios from "axios"

const DeleteConfirm = ({ product, onConfirm }: { product: ProductTypes; onConfirm: () => void }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/deleteProduct/${product._id}`);
      onConfirm();
      setOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
        <Trash2 className="w-4 h-4" />
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
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteConfirm;