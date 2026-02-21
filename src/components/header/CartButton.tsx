import Link from "next/link";
import { LucideShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getUserCart } from "@/features/cart/utils/actions";

export default async function CartButton() {
  const cart = await getUserCart();
  const count =
    cart?.cartItems.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <Button asChild variant="outline" size="icon" className="relative">
      <Link href="/cart">
        <LucideShoppingCart />

        {count > 0 && (
          <Badge className="absolute -top-3 -right-3">{count}</Badge>
        )}
      </Link>
    </Button>
  );
}
