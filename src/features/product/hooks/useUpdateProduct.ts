import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { UpdateProductFormData } from "@/features/product/utils/schemas";
import { updateProduct } from "@/features/product/utils/actions";

const useUpdateProduct = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdate = ({
    id,
    formData,
  }: {
    id: string;
    formData: UpdateProductFormData;
  }) => {
    startTransition(async () => {
      const res = await updateProduct({ id, formData });

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
    handleUpdate,
  };
};

export default useUpdateProduct;
