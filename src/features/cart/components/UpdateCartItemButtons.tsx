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
    <div className="flex items-center gap-4">
      <Button
        size="icon-sm"
        className="cursor-pointer"
        onClick={() => handleUpdate({ productId, action: "DECREMENT" })}
        disabled={isPending}
      >
        <LucideMinus />
      </Button>

      <div className="font-semibold">
        {isPending ? <Spinner data-icon="inline-start" /> : quantity}
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
