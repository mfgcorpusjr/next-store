import { useTransition } from "react";
import { toast } from "sonner";

import { deleteProduct } from "@/features/product/utils/actions";

const useDeleteProduct = () => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (productId: string) => {
    startTransition(async () => {
      const res = await deleteProduct(productId);

      if (res.status === "SUCCESS") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return {
    isPending,
    handleDelete,
  };
};

export default useDeleteProduct;
