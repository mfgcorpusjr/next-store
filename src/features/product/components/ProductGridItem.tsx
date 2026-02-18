import Link from "next/link";
import Image from "next/image";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ToggleFavoriteButton from "@/features/favorite/components/ToggleFavoriteButton";

import { Product } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/format";

type ProductGridItemProps = {
  product: Product;
};

export default function ProductGridItem({ product }: ProductGridItemProps) {
  return (
    <div className="relative">
      <Link href={`/products/${product.id}`}>
        <Card className="group pt-0 overflow-hidden shadow-none">
          <CardHeader className="p-0">
            <div className="relative h-64 md:h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <h4 className="font-semibold">{product.name}</h4>

            <p className="text-sm text-muted-foreground">
              {formatCurrency(product.price)}
            </p>
          </CardContent>
        </Card>
      </Link>

      <div className="absolute top-4 right-4">
        <ToggleFavoriteButton productId={product.id} />
      </div>
    </div>
  );
}
