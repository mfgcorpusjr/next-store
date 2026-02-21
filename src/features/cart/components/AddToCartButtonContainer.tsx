import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import AddToCartButton from "@/features/cart/components/AddToCartButton";

type AddToCartButtonContainerProps = {
  productId: string;
};

export default async function AddToCartButtonContainer({
  productId,
}: AddToCartButtonContainerProps) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <SignInButton mode="modal">
        <Button>Add to Cart</Button>
      </SignInButton>
    );
  }

  return <AddToCartButton productId={productId} />;
}
