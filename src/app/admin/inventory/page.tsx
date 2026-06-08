import { ProductTypes } from "@/types/ProductTypes"
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const getProducts = async (): Promise<ProductTypes[]> => {
  try {
    const res = await fetch('http://localhost:3000/api/user/getAllProducts')
    const data = await res.json()
    return data.products || []
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
}

export default async function page() {
  const products: ProductTypes[] = await getProducts();
  
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
                <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                <p className="text-sm text-muted-foreground">
                  {product.isFeatured ? "Featured" : "Not Featured"}
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}