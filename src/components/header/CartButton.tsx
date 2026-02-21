import Link from "next/link";
import { LucideShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getCart } from "@/features/cart/utils/actions";

export default async function CartButton() {
  const cart = await getCart();
  const count = cart?.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Button asChild variant="outline" size="icon" className="relative">
      <Link href="/cart">
        <LucideShoppingCart />

        {count && <Badge className="absolute -top-3 -right-3">{count}</Badge>}
      </Link>
    </Button>
  );
}
