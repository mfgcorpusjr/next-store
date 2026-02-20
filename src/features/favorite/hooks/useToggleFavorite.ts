import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { toggleFavorite } from "@/features/favorite/utils/actions";

const useToggleFavorite = () => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleToggleFavorite = ({
    id,
    productId,
  }: {
    id?: string;
    productId: string;
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
