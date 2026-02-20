import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { UpdateProductImageFormData } from "@/features/product/utils/schemas";
import { updateProductImage } from "@/features/product/utils/actions";

const useUpdateProductImage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdateProductImage = ({
    id,
    formData,
  }: {
    id: string;
    formData: UpdateProductImageFormData;
  }) => {
    startTransition(async () => {
      const data = new FormData();
      data.append("image", formData.image);

      const res = await updateProductImage({ id, formData: data });

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
    handleUpdateProductImage,
  };
};

export default useUpdateProductImage;
