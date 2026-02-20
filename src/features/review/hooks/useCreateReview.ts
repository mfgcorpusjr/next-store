import { useTransition } from "react";
import { toast } from "sonner";

import { CreateReviewFormData } from "@/features/review/utils/schemas";
import { createReview } from "@/features/review/utils/actions";

const useCreateReview = () => {
  const [isPending, startTransition] = useTransition();

  const handleCreateReview = ({
    productId,
    formData,
  }: {
    productId: string;
    formData: CreateReviewFormData;
  }) => {
    startTransition(async () => {
      const res = await createReview({ productId, formData });

      if (res.status === "SUCCESS") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return {
    isPending,
    handleCreateReview,
  };
};

export default useCreateReview;
