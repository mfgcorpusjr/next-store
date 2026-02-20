import { useTransition } from "react";
import { toast } from "sonner";

import { deleteReview } from "@/features/review/utils/actions";

const useDeleteReview = () => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (reviewId: string) => {
    startTransition(async () => {
      const res = await deleteReview(reviewId);

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

export default useDeleteReview;
