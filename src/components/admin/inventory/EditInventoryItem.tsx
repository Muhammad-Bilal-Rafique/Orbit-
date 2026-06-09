"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductTypes } from "@/types/ProductTypes";
import axios from "axios"


interface EditInventoryItemProps {
  product: ProductTypes;
  onClose: () => void;
  onConfirm: () => void;
}


const EditInventoryItem = ({ product, onClose , onConfirm }: EditInventoryItemProps) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<ProductTypes>({
    defaultValues: {
      _id:product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      keywords: product.keywords,
      isFeatured: product.isFeatured,
    },
  });

  const onSubmit: SubmitHandler<ProductTypes> = async (data) => {
    try {
      await axios.put("/api/admin/editProduct", data);
       onConfirm();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} />
        {errors.name && <p className="text-xs text-destructive">Required</p>}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea {...register("description", { required: true })} rows={3} />
        {errors.description && <p className="text-xs text-destructive">Required</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input type="number" step="0.01" {...register("price", { required: true, valueAsNumber: true })} />
          {errors.price && <p className="text-xs text-destructive">Required</p>}
        </div>
        <div>
          <Label>Stock</Label>
          <Input type="number" {...register("stock", { required: true, valueAsNumber: true })} />
          {errors.stock && <p className="text-xs text-destructive">Required</p>}
        </div>
      </div>

      <div>
        <Label>Category</Label>
        <select {...register("category", { required: true })} className="w-full border rounded px-3 py-2">
          <option value="">Select</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
        </select>
        {errors.category && <p className="text-xs text-destructive">Required</p>}
      </div>

      <div>
        <Label>Keywords</Label>
        <Input {...register("keywords", { required: true })} placeholder="comma separated" />
        {errors.keywords && <p className="text-xs text-destructive">Required</p>}
      </div>

      <div className="flex items-center gap-2">
        <Controller
          name="isFeatured"
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label>Featured</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditInventoryItem;