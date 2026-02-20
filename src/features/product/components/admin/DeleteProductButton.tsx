import { LucideTrash2 } from "lucide-react";

type DeleteProductButtonProps = {
  productId: string;
};

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  return (
    <LucideTrash2 className="size-4 text-muted-foreground cursor-pointer" />
  );
}
