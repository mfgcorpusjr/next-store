import EmptyList from "@/components/EmptyList";
import ProductListItem from "@/features/product/components/ProductListItem";

import { Product } from "@/generated/prisma/client";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="flex flex-col gap-8">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
