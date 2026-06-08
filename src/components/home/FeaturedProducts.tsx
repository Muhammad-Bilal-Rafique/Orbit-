import ProductCard from "@/components/users-products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {ProductTypes} from "@/types/ProductTypes"


const getFeaturedProducts = async () => {
  try{
    const res = await fetch('http://localhost:3000/api/user/getFeatured')
    const data = await res.json()
    return data.products
  } catch (error) {
    if (error) {
      console.log(error)
  }
  }
}

const featured : ProductTypes[] = await getFeaturedProducts()

export default function FeaturedProducts() {

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Trending items this season</p>
          </div>
          <Link href="/users/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}