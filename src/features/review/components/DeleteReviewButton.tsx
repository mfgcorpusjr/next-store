import { LucideTrash2 } from "lucide-react";

type DeleteReviewButtonProps = {
  reviewId: string;
};

export default function DeleteReviewButton({
  reviewId,
}: DeleteReviewButtonProps) {
  return <LucideTrash2 className="size-4 text-destructive cursor-pointer" />;
}
