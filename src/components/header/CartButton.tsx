import Link from "next/link";
import { LucideShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CartButton() {
  return (
    <Button asChild variant="outline" size="icon" className="relative">
      <Link href="/cart">
        <LucideShoppingCart />

        <Badge className="absolute -top-3 -right-3">0</Badge>
      </Link>
    </Button>
  );
}
