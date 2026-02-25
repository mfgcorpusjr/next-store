import { useTransition } from "react";
import { toast } from "sonner";

import { deleteCartItem } from "@/features/cart/utils/actions";

const useDeleteCartItem = () => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (cartItemId: string) => {
    startTransition(async () => {
      const res = await deleteCartItem(cartItemId);

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

export default useDeleteCartItem;
