"use client";

import { LucideTrash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DeleteDialog from "@/components/DeleteDialog";

import useDeleteProduct from "@/features/product/hooks/useDeleteProduct";

type DeleteProductButtonProps = {
  productId: string;
};

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const { isPending, handleDelete } = useDeleteProduct();

  return (
    <DeleteDialog
      trigger={
        <LucideTrash2 className="size-4 text-muted-foreground cursor-pointer" />
      }
    >
      <Button
        variant="destructive"
        disabled={isPending}
        onClick={() => handleDelete(productId)}
      >
        {isPending && <Spinner data-icon="inline-start" />}
        Delete
      </Button>
    </DeleteDialog>
  );
}
