import {mockProducts} from "@/lib/mockProducts"
import ProductsClient from "@/components/users-products/ProductsClient"
import {ProductTypes} from "@/types/ProductTypes"
const ProductsPage = () => {
  const products: ProductTypes[] = mockProducts
  return (
    <div>
      <ProductsClient products={products} />
    </div>
  )
}

export default ProductsPage
