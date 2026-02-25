"use client";

import { LucideTrash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DeleteDialog from "@/components/DeleteDialog";

import useDeleteCartItem from "@/features/cart/hooks/useDeleteCartItem";

type DeleteCartItemButtonProps = {
  cartItemId: string;
};

export default function DeleteCartItemButton({
  cartItemId,
}: DeleteCartItemButtonProps) {
  const { isPending, handleDelete } = useDeleteCartItem();

  return (
    <DeleteDialog
      trigger={
        <Button variant="destructive" size="icon-sm" className="cursor-pointer">
          <LucideTrash2 />
        </Button>
      }
    >
      <Button
        variant="destructive"
        disabled={isPending}
        onClick={() => handleDelete(cartItemId)}
      >
        {isPending && <Spinner data-icon="inline-start" />}
        Delete
      </Button>
    </DeleteDialog>
  );
}
