import { Metadata } from "next";
import Link from "next/link";
import { LucidePencil } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteProductButton from "@/features/product/components/admin/DeleteProductButton";

import { getProducts } from "@/features/product/utils/actions";
import { formatCurrency } from "@/utils/format";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Card>
      <CardContent>
        <Table>
          <TableCaption>Total Products: {products.length}</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.company}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell className="flex justify-center items-center gap-4">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <LucidePencil className="size-4 text-muted-foreground" />
                  </Link>

                  <DeleteProductButton productId={product.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
