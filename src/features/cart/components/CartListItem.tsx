import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import UpdateCartItemButtons from "@/features/cart/components/UpdateCartItemButtons";
import DeleteCartItemButton from "@/features/cart/components/DeleteCartItemButton";

import { CartItem, Product } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/format";

type CartListItemProps = {
  cartItem: CartItem & { product: Product };
};

export default function CartListItem({ cartItem }: CartListItemProps) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex flex-col md:flex-row items-center gap-8">
        <Link href={`/products/${cartItem.productId}`}>
          <Image
            src={cartItem.product.image}
            alt={cartItem.product.name}
            width={128}
            height={128}
            loading="eager"
            className="size-32 md:size-16 object-cover rounded"
          />
        </Link>

        <div className="flex-1 flex flex-col items-center md:items-start gap-2">
          <Link
            href={`/products/${cartItem.productId}`}
            className="text-sm font-semibold line-clamp-1"
          >
            {cartItem.product.name}
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-1">
            {cartItem.product.company}
          </p>
        </div>

        <UpdateCartItemButtons
          productId={cartItem.productId}
          quantity={cartItem.quantity}
        />

        <div>{formatCurrency(cartItem.product.price)}</div>

        <DeleteCartItemButton cartItemId={cartItem.id} />
      </CardContent>
    </Card>
  );
}
