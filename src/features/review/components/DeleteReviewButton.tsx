"use client";

import { LucideTrash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DeleteDialog from "@/components/DeleteDialog";

import useDeleteReview from "@/features/review/hooks/useDeleteReview";

type DeleteReviewButtonProps = {
  reviewId: string;
};

export default function DeleteReviewButton({
  reviewId,
}: DeleteReviewButtonProps) {
  const { isPending, handleDelete } = useDeleteReview();

  return (
    <DeleteDialog
      trigger={
        <LucideTrash2 className="size-4 text-destructive cursor-pointer" />
      }
    >
      <Button
        variant="destructive"
        disabled={isPending}
        onClick={() => handleDelete(reviewId)}
      >
        {isPending && <Spinner data-icon="inline-start" />}
        Delete
      </Button>
    </DeleteDialog>
  );
}
