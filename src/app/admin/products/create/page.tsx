import { Metadata } from "next";

import CreateProductForm from "@/features/product/components/admin/CreateProductForm";

export const metadata: Metadata = {
  title: "Create Product",
};

export default function CreateProductPage() {
  return <CreateProductForm />;
}
