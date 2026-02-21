import { useTransition } from "react";
import { toast } from "sonner";

import { updateCartItem } from "@/features/cart/utils/actions";
import { Action } from "@/features/cart/utils/types";

const useUpdateCartItem = () => {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = ({
    productId,
    action,
    onSuccess,
  }: {
    productId: string;
    action: Action;
    onSuccess?: () => void;
  }) => {
    startTransition(async () => {
      const res = await updateCartItem({ productId, action });

      if (res.status === "SUCCESS") {
        toast.success(res.message);
        onSuccess?.();
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

export default useUpdateCartItem;
