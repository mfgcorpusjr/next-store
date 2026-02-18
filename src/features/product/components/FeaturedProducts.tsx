import ProductGrid from "@/features/product/components/ProductGrid";

import { getFeaturedProducts } from "@/features/product/utils/actions";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return <ProductGrid products={products} />;
}
