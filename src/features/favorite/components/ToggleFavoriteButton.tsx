"use client";

import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import useToggleFavorite from "@/features/favorite/hooks/useToggleFavorite";

type ToggleFavoriteButtonProps = {
  id?: string;
  productId: string;
};

export default function ToggleFavoriteButton({
  id,
  productId,
}: ToggleFavoriteButtonProps) {
  const { isPending, handleToggleFavorite } = useToggleFavorite();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className="cursor-pointer"
      disabled={isPending}
      onClick={() => handleToggleFavorite({ id, productId })}
    >
      {isPending ? (
        <Spinner />
      ) : id ? (
        <IoHeartSharp className="text-primary" />
      ) : (
        <IoHeartOutline />
      )}
    </Button>
  );
}
