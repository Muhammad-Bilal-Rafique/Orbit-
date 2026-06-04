import ProductDetailClient from "@/components/users-products/ProductDetailClient";

interface Props {
  params: { id: string };
}


export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  return <ProductDetailClient productId={id} />;
}