import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  return <Button>Add to Cart</Button>;
}
