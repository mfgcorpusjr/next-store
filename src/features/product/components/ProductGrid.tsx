import EmptyList from "@/components/EmptyList";
import ProductGridItem from "@/features/product/components/ProductGridItem";

import { Product } from "@/generated/prisma/client";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductGridItem key={product.id} product={product} />
      ))}
    </div>
  );
}
