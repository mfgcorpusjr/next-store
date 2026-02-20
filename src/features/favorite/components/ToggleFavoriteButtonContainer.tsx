import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { IoHeartOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import ToggleFavoriteButton from "@/features/favorite/components/ToggleFavoriteButton";

import { getFavorite } from "@/features/favorite/utils/actions";

type ToggleFavoriteButtonContainerProps = {
  productId: string;
};

export default async function ToggleFavoriteButtonContainer({
  productId,
}: ToggleFavoriteButtonContainerProps) {
  const { userId } = await auth();

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button variant="outline" size="icon-sm" className="cursor-pointer">
          <IoHeartOutline />
        </Button>
      </SignInButton>
    );
  }

  const favorite = await getFavorite(productId);

  return <ToggleFavoriteButton id={favorite?.id} productId={productId} />;
}
