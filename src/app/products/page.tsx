import { Metadata } from "next";

import SectionTitle from "@/components/SectionTitle";
import EmptyList from "@/components/EmptyList";
import ProductGrid from "@/features/product/components/ProductGrid";
import ProductList from "@/features/product/components/ProductList";
import ProductDisplaySwitcher from "@/features/product/components/ProductDisplaySwitcher";

import { getProducts } from "@/features/product/utils/actions";

export const metadata: Metadata = {
  title: "Products",
};

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    layout?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { search = "", layout = "grid" } = await searchParams;
  const products = await getProducts(search);
  const length = products.length;

  return (
    <div className="space-y-8">
      <SectionTitle
        text={`${length} product${length > 1 ? "s" : ""}`}
        rightContent={
          length > 0 && (
            <ProductDisplaySwitcher search={search} layout={layout} />
          )
        }
      />

      {length === 0 && <EmptyList />}

      {length > 0 && layout === "grid" && <ProductGrid products={products} />}

      {length > 0 && layout === "list" && (
        <>
          <div className="hidden md:block">
            <ProductList products={products} />
          </div>

          <div className="block md:hidden">
            <ProductGrid products={products} />
          </div>
        </>
      )}
    </div>
  );
}
