import { Metadata } from "next";

import UpdateProductForm from "@/features/product/components/admin/UpdateProductForm";

import { getProduct } from "@/features/product/utils/actions";

export const metadata: Metadata = {
  title: "Edit Product",
};

type EditProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return <UpdateProductForm product={product} />;
}
