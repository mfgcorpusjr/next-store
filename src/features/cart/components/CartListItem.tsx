import Image from "next/image";
import { LucideMinus, LucidePlus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <Image
          src={cartItem.product.image}
          alt={cartItem.product.name}
          width={128}
          height={128}
          className="size-32 md:size-16 object-cover rounded"
        />

        <div className="flex-1 flex flex-col items-center md:items-start gap-2">
          <h4 className="text-sm font-semibold line-clamp-1">
            {cartItem.product.name}
          </h4>

          <p className="text-xs text-muted-foreground line-clamp-1">
            {cartItem.product.company}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button size="icon-sm" className="cursor-pointer">
            <LucideMinus />
          </Button>

          <div className="font-semibold">{cartItem.quantity}</div>

          <Button size="icon-sm" className="cursor-pointer">
            <LucidePlus />
          </Button>
        </div>

        <div>{formatCurrency(cartItem.product.price)}</div>

        <DeleteCartItemButton cartItemId={cartItem.id} />
      </CardContent>
    </Card>
  );
}
