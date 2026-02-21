"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import useUpdateCartItem from "@/features/cart/hooks/useUpdateCartItem";

type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const router = useRouter();
  const { isPending, handleUpdate } = useUpdateCartItem();

  return (
    <Button
      disabled={isPending}
      onClick={() =>
        handleUpdate({
          productId,
          action: "INCREMENT",
          onSuccess: () => router.push("/cart"),
        })
      }
    >
      {isPending && <Spinner data-icon="inline-start" />}
      Add to Cart
    </Button>
  );
}
