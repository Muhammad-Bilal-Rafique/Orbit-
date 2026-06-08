import ProductsClient from "@/components/users-products/ProductsClient"
import {ProductTypes} from "@/types/ProductTypes"

const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/user/getAllProducts");
    const data = await res.json(); 
    console.log(data.products); 
    return data.products;
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


const ProductsPage = async () => {
  const products: ProductTypes[] = await getProducts();
  return (
    <div>
      <ProductsClient products={products} />
    </div>
  )
}

export default ProductsPage
