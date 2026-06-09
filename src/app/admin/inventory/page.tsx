import { ProductTypes } from "@/types/ProductTypes"
import ProductsList from "@/components/admin/inventory/productsList"
import { getProducts } from "@/lib/getProducts"


export default async function page() {
  const Products: ProductTypes[] = await getProducts();
  return (
    <ProductsList Products={Products}/>
  );
}