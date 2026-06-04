import ProductDetailClient from "@/components/users-products/ProductDetailClient";

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  return <ProductDetailClient productId={params.id} />;
}