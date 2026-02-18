import Link from "next/link";
import Image from "next/image";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ToggleFavoriteButton from "@/features/favorite/components/ToggleFavoriteButton";

import { Product } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/format";

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div className="relative">
      <Link href={`/products/${product.id}`}>
        <Card className="group p-0 overflow-hidden">
          <CardContent className="flex gap-8 p-0">
            <Image
              src={product.image}
              alt={product.name}
              priority
              width={192}
              height={192}
              className="size-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="flex-1 p-4 space-y-2">
              <h4 className="font-semibold">{product.name}</h4>

              <p className="text-sm text-muted-foreground">{product.company}</p>

              <p className="text-sm text-muted-foreground">
                {formatCurrency(product.price)}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>

      <div className="absolute top-4 right-4">
        <ToggleFavoriteButton productId={product.id} />
      </div>
    </div>
  );
}
