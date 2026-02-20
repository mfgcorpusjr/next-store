import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CreateProductFormData } from "@/features/product/utils/schemas";
import { createProduct } from "@/features/product/utils/actions";

const useCreateProduct = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateProduct = (formData: CreateProductFormData) => {
    startTransition(async () => {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("company", formData.company);
      data.append("price", String(formData.price));
      data.append("image", formData.image);
      data.append("description", formData.description);
      data.append("isFeatured", String(formData.isFeatured));

      const res = await createProduct(data);

      if (res.status === "SUCCESS") {
        toast.success(res.message);
        router.push("/admin/products");
      } else {
        toast.error(res.message);
      }
    });
  };

  return {
    isPending,
    handleCreateProduct,
  };
};

export default useCreateProduct;
