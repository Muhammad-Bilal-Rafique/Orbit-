"use client";
import React, { useState } from "react";
import { useForm,SubmitHandler,Controller  } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import  {ProductAdminTypes}  from "@/types/ProductTypes";
import axios from "axios"

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductAdminTypes>({defaultValues:{isFeatured:false}});
  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmit: SubmitHandler<ProductAdminTypes> = async (data) => {
     try {
    const res = await axios.post("/api/admin/addProduct", {
      ...data,
      imageUrl,
    });
    console.log("Product created:", res.data);
  } catch (error) {
    console.error("Error:", error);
  }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto p-6"
    >
      <div>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} />
        {errors.name && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea {...register("description", { required: true })} rows={4} />
        {errors.description && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            step="0.01"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && <p className="text-red-500 text-sm">Required</p>}
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            {...register("stock", { required: true, valueAsNumber: true })}
          />
          {errors.stock && <p className="text-red-500 text-sm">Required</p>}
        </div>
      </div>

      <div>
        <Label>Category</Label>
        <select
          {...register("category", { required: true })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <Label>Keywords</Label>
        <Input
          {...register("keywords", { required: true })}
          placeholder="comma separated"
        />
        {errors.keywords && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <Label>Image</Label>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) =>
                setImageUrl(event.target?.result as string);
              reader.readAsDataURL(file);
            }
          }}
          accept="image/*"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            className="w-32 h-32 mt-2 rounded"
          />
        )}
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

      <Button type="submit">Add Product</Button>
    </form>
  );
}
