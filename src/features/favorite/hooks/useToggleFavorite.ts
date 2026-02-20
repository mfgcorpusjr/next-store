import { useTransition } from "react";
import { toast } from "sonner";

import { toggleFavorite } from "@/features/favorite/utils/actions";

const useToggleFavorite = () => {
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = ({
    id,
    productId,
    pathname,
  }: {
    id?: string;
    productId: string;
    pathname: string;
  }) => {
    startTransition(async () => {
      const res = await toggleFavorite({ id, productId, pathname });

      if (res.status === "SUCCESS") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return {
    isPending,
    handleToggleFavorite,
  };
};

export default useToggleFavorite;
