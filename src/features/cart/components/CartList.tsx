import EmptyList from "@/components/EmptyList";
import CartListItem from "@/features/cart/components/CartListItem";

import { getUserCart } from "@/features/cart/utils/actions";

export default async function CartList() {
  const cart = await getUserCart();

  if (!cart || cart?.cartItems.length === 0) {
    return <EmptyList />;
  }

  cart.cartItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="flex flex-col gap-8">
      {cart.cartItems.map((cartItem) => (
        <CartListItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}
