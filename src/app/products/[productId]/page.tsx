import { Metadata } from "next";
import Image from "next/image";

import ProductBreadcrumb from "@/features/product/components/ProductBreadcrumb";
import ToggleFavoriteButtonContainer from "@/features/favorite/components/ToggleFavoriteButtonContainer";
import ProductRating from "@/features/product/components/ProductRating";
import ShareProduct from "@/features/product/components/ShareProduct";
import AddToCartButton from "@/features/cart/components/AddToCartButton";

import { getProduct } from "@/features/product/utils/actions";
import { formatCurrency } from "@/utils/format";

type ProductDetailsPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: ProductDetailsPageProps): Promise<Metadata> => {
  const { productId } = await params;
  const { name } = await getProduct(productId);

  return {
    title: name,
  };
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <div className="space-y-8">
      <ProductBreadcrumb name={product.name} />

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        <div className="relative h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover rounded"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h4 className="text-2xl font-bold tracking-tight">
                {product.name}
              </h4>

              <ToggleFavoriteButtonContainer productId={product.id} />

              <ShareProduct id={product.id} name={product.name} />
            </div>

            <ProductRating productId={product.id} />
          </div>

          <p className="text-xs text-muted-foreground">{product.company}</p>

          <p className="inline-block bg-secondary px-2 py-1 rounded">
            {formatCurrency(product.price)}
          </p>

          <p className="text-sm text-muted-foreground leading-7">
            {product.description}
          </p>

          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
