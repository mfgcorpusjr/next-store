import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";

type ToggleFavoriteButtonProps = {
  productId: string;
};

export default function ToggleFavoriteButton({
  productId,
}: ToggleFavoriteButtonProps) {
  return (
    <Button variant="secondary" size="icon-sm" className="cursor-pointer">
      <IoHeartSharp />
    </Button>
  );
}
