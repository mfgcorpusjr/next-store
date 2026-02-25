import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CartTotalItem from "@/features/cart/components/CartTotalItem";

import { getUserCart } from "@/features/cart/utils/actions";
import { formatCurrency } from "@/utils/format";
import { SHIPPING, TAX } from "@/features/cart/utils/constants";

export default async function CartTotal() {
  const cart = await getUserCart();

  const subtotal =
    cart?.cartItems.reduce(
      (acc, item) => (acc += item.product.price * item.quantity),
      0,
    ) ?? 0;

  const tax = subtotal * TAX;

  const orderTotal = subtotal + SHIPPING + tax;

  return (
    <div className="space-y-8">
      <Card className="shadow-none">
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <CartTotalItem
              label="Subtotal:"
              value={formatCurrency(subtotal)}
              className="border-b"
            />

            <CartTotalItem
              label="Shipping:"
              value={formatCurrency(SHIPPING)}
              className="border-b"
            />

            <CartTotalItem
              label="Tax:"
              value={formatCurrency(tax)}
              className="border-b"
            />
          </div>

          <CartTotalItem
            label="Order Total:"
            value={formatCurrency(orderTotal)}
            className="font-bold"
          />
        </CardContent>
      </Card>

      <Button className="w-full cursor-pointer" disabled={!cart}>
        Place Order
      </Button>
    </div>
  );
}
