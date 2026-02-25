"use client";

import { LucideMinus, LucidePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import useUpdateCartItem from "@/features/cart/hooks/useUpdateCartItem";

type UpdateCartItemButtonsProps = {
  productId: string;
  quantity: number;
};

export default function UpdateCartItemButtons({
  productId,
  quantity,
}: UpdateCartItemButtonsProps) {
  const { isPending, handleUpdate } = useUpdateCartItem();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon-sm"
        className="cursor-pointer"
        onClick={() => handleUpdate({ productId, action: "DECREMENT" })}
        disabled={isPending}
      >
        <LucideMinus />
      </Button>

      <div className="w-8 text-center">
        {isPending ? <Spinner className="mx-auto" /> : quantity}
      </div>

      <Button
        size="icon-sm"
        className="cursor-pointer"
        onClick={() => handleUpdate({ productId, action: "INCREMENT" })}
        disabled={isPending}
      >
        <LucidePlus />
      </Button>
    </div>
  );
}
