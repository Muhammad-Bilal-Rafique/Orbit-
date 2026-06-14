"use client";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductTypes } from "@/types/ProductTypes";
import axios from "axios";

interface EditInventoryItemProps {
  product: ProductTypes;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EditInventoryItem({
  product,
  onClose,
  onConfirm,
}: EditInventoryItemProps) {
  // Parse keywords back into a clean string for editing
  const initialKeywordsString = Array.isArray(product.keywords)
    ? product.keywords.join(", ")
    : product.keywords;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      keywords: initialKeywordsString,
      isFeatured: product.isFeatured,
      variants: product.variants || [],
    },
  });

  // Dynamic Array Controller for active variant fields matrix
  const { fields } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      // Clean up keywords back into a structural string array before sending
      const cleanData = {
        ...data,
        keywords:
          typeof data.keywords === "string"
            ? data.keywords
                .split(",")
                .map((k: string) => k.trim())
                .filter(Boolean)
            : data.keywords,
      };

      await axios.put("/api/admin/editProduct", cleanData);
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Update execution failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-h-[80vh] overflow-y-auto px-1 pb-4 font-sans"
    >
      {/* CORE PRIMITIVE DETAILS */}
      <div className="space-y-4">
        <div>
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Product Name
          </Label>
          <Input {...register("name", { required: true })} className="mt-1" />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">Required</p>
          )}
        </div>

        <div>
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Description
          </Label>
          <Textarea
            {...register("description", { required: true })}
            rows={3}
            className="mt-1"
          />
          {errors.description && (
            <p className="text-xs text-destructive mt-1">Required</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Base Price ($)
            </Label>
            <Input
              type="number"
              step="0.01"
              {...register("price", { required: true, valueAsNumber: true })}
              className="mt-1"
            />
            {errors.price && (
              <p className="text-xs text-destructive mt-1">Required</p>
            )}
          </div>

          <div>
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Category
            </Label>
            <select
              {...register("category", { required: true })}
              className="w-full h-10 mt-1 border border-input bg-background rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
        </div>

        <div>
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Keywords (Style Tags)
          </Label>
          <Input
            {...register("keywords", { required: true })}
            placeholder="e.g. vintage, cotton, oversized"
            className="mt-1"
          />
        </div>

        <div className="flex items-center gap-2 py-1">
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="featured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label
            htmlFor="featured"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer"
          >
            Feature this product on storefront
          </label>
        </div>
      </div>

      <hr className="border-border my-6" />

      {/*  THE DYNAMIC INVENTORY VARIANTS MANAGEMENT GRID */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
          Variant Matrix Modifications
        </h3>

        <div className="space-y-3 border border-border p-3 rounded-md bg-secondary/20">
          <div className="hidden sm:grid grid-cols-3 gap-3 px-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 border-b border-border/40 pb-2">
            <div>Variants</div>
            <div>Price ($)</div>
            <div>Stock Count</div>
          </div>
          {fields.map((field, index) => {
            // Read combinations directly from the array node indices safely
            const combo =
              ((product.variants &&
                product.variants[index]?.combination) as any) || {};
            const comboLabel = Object.entries(combo)
              .map(([key, val]) => `${val}`)
              .join(" / ");

            return (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center border-b border-border/60 pb-3 last:border-0 last:pb-0"
              >
                {/* Visual Label (e.g., Color: Red / Size: M) */}
                <div className="text-xs font-semibold text-foreground tracking-tight truncate sm:col-span-1">
                  {comboLabel || `Variant #${index + 1}`}
                </div>

                {/* Specific Variant Price */}
                <div>
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground/80 sm:hidden">
                    Price
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    {...register(`variants.${index}.price`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="h-8 text-xs font-medium"
                  />
                </div>

                {/* Specific Variant Stock */}
                <div>
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground/80 sm:hidden">
                    Stock
                  </Label>
                  <Input
                    type="number"
                    placeholder="Stock"
                    {...register(`variants.${index}.stock`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="h-8 text-xs font-medium"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM ACTION TRACERS */}
      <div className="flex gap-2 pt-4 border-t border-border mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="uppercase font-medium tracking-wider text-xs h-10 px-6"
        >
          {isSubmitting ? "Saving Configs..." : "Save Modifications"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="uppercase font-medium tracking-wider text-xs h-10"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
