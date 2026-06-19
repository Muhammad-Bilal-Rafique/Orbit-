"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductAdminTypes } from "@/types/ProductTypes";
import { Plus, Image, Layers, Tag, Percent } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ColorInputZone from "@/components/admin/addProduct/ColorInputZone";
import SizeInputZone from "@/components/admin/addProduct/SizeInputZone";
import VariantsMatrixTable from "@/components/admin/addProduct/VariantsMatrixTable";

export default function AddProduct() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductAdminTypes>({ defaultValues: { isFeatured: false } });

  useEffect(() => {
    if (colors.length > 0 && sizes.length > 0) {
      const generatedMatrix = colors.flatMap((color) =>
        sizes.map((size) => {
          const old = variants.find(
            (v) => v.color === color && v.size === size,
          );
          return {
            color,
            size,
            price: old ? old.price : "",
            stock: old ? old.stock : "",
          };
        }),
      );
      setVariants(generatedMatrix);
    } else {
      setVariants([]);
    }
  }, [colors, sizes]);

  const onSubmit: SubmitHandler<ProductAdminTypes> = async (data) => {
    setIsSubmitting(true);
    try {
      const finalPayload = {
        ...data,
        imageUrl,
        attributes: [
          { name: "Color", values: colors },
          { name: "Size", values: sizes },
        ],
        variants: variants.map((v) => ({
          combination: { Color: v.color, Size: v.size },
          price: Number(v.price || data.price),
          stock: Number(v.stock || 0),
        })),
      };
      const res = await axios.post("/api/admin/addProduct", finalPayload);
      if (res.status === 200 || res.status === 201) {
        toast.success("Product successfully added into database.");
      }
    } catch (error) {
      toast.error("Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-10 bg-card border border-border p-8 sm:p-10 rounded-lg shadow-sm"
      >
        {/* HEADER BLOCK — Stark Architectural Look */}
        <div className="border-b border-border pb-6 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Plus className="w-3 h-3" /> Orbit Inventory Studio
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-primary">
            Create Product Node
          </h2>
          <p className="text-sm text-muted-foreground">
            Register global specifications, assets, and size-color matrix stock
            arrays.
          </p>
        </div>

        {/* SECTION 1: CORE TELEMETRY */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border-b border-muted pb-2">
            <Tag className="w-3.5 h-3.5" /> Core Manifest
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Product Identity / Name
            </Label>
            <Input
              {...register("name", { required: true })}
              className="bg-background border-input focus-visible:ring-ring h-10 transition-all rounded-md placeholder:text-muted-foreground/50 text-sm"
              placeholder="e.g., Orbit Premium Heavyweight Hoodie"
            />
            {errors.name && (
              <p className="text-destructive text-xs font-medium">
                Product name string mapping required.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Detailed Description
            </Label>
            <Textarea
              {...register("description", { required: true })}
              rows={4}
              className="bg-background border-input focus-visible:ring-ring transition-all rounded-md resize-none placeholder:text-muted-foreground/50 text-sm"
              placeholder="Specify structural metrics, fabric density gsm parameters, tailoring specifications..."
            />
            {errors.description && (
              <p className="text-destructive text-xs font-medium">
                Description context stream cannot remain null.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Base Retail Price ($)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="bg-background border-input focus-visible:ring-ring h-10 pl-7 transition-all rounded-md text-sm"
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="text-destructive text-xs font-medium">
                  Price configuration node fault.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </Label>
              <div className="relative">
                <select
                  {...register("category", { required: true })}
                  className="w-full h-10 bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring transition-all rounded-md px-3 text-sm text-foreground outline-none cursor-pointer appearance-none"
                >
                  <option value="">--Select Category--</option>
                  <option value="t-shirts">T-Shirts</option>
                  <option value="shirts">Shirts</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="jackets">Jackets</option>
                  <option value="pants">Pants</option>
                  <option value="shorts">Shorts</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">
                  ▼
                </div>
              </div>
              {errors.category && (
                <p className="text-destructive text-xs font-medium">
                  Category placement matrix target mandatory.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: PRODUCT VARIANTS STARK GRID BOX */}
        <div className="space-y-5 border border-border p-6 rounded-md bg-secondary/30">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-3">
            <Layers className="w-3.5 h-3.5" /> Dimensions & Variant Arrays
            Matrix
          </div>
          <div className="space-y-6 pt-1">
            <ColorInputZone colors={colors} setColors={setColors} />
            <SizeInputZone sizes={sizes} setSizes={setSizes} />
            {variants.length > 0 && (
              <div className="pt-2 animate-in fade-in duration-200">
                <VariantsMatrixTable
                  variants={variants}
                  setVariants={setVariants}
                />
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: SYSTEM INDEXING PARAMETERS */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tags (For User to Search for)
            </Label>
            <p className="text-sm font-bold">*COMMA SEPERATED</p>
            <Input
              {...register("keywords", { required: true })}
              placeholder="e.g., minimal, core, heavyweight, cotton"
              className="bg-background border-input focus-visible:ring-ring h-10 transition-all rounded-md placeholder:text-muted-foreground/40 text-sm"
            />
            {errors.keywords && (
              <p className="text-destructive text-xs font-medium">
                Search query vectors declaration mandatory.
              </p>
            )}
          </div>

          {/* STARK STYLED ASSET BOX */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Visual Asset Payload
            </Label>
            <div className="relative border border-dashed border-border hover:border-primary bg-background rounded-md p-6 transition-all group flex flex-col items-center justify-center gap-2 cursor-pointer text-center">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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
              <div className="p-2.5 bg-secondary rounded-sm border border-border transition-all">
                <Image className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-foreground">
                  Upload file binary stream
                </p>
                <p className="text-[11px] text-muted-foreground">
                  JPG, PNG, or high-density WEBP source parameters
                </p>
              </div>
            </div>

            {imageUrl && (
              <div className="relative mt-3 w-24 h-24 border border-border rounded-md p-1 bg-background group animate-in zoom-in-95 duration-200">
                <img
                  src={imageUrl}
                  alt="preview"
                  className="w-full h-full rounded-sm object-cover  transition-all"
                />
              </div>
            )}
          </div>
        </div>

        {/* PROMOTED BAR CONTROL BLOCK */}
        <div className="flex items-center justify-between border border-border bg-background p-4 rounded-md">
          <div className="space-y-0.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
              <Percent className="w-3.5 h-3.5" /> Featured Product
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Add this product in the featured section.
            </p>
          </div>
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="w-4 h-4 border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all rounded-sm"
              />
            )}
          />
        </div>

        {/* SUBMIT BUTTON — Pure Stark Black/Slate */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm rounded-md tracking-wider transition-colors border border-transparent active:scale-[0.995] flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Publishing...
            </>
          ) : (
            "Publish Product"
          )}
        </Button>
      </form>
    </div>
  );
}
