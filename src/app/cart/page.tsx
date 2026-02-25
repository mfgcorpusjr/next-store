import { Metadata } from "next";

import Section from "@/components/Section";
import CartList from "@/features/cart/components/CartList";
import CartTotal from "@/features/cart/components/CartTotal";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <Section title="Cart">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <CartList />
        </div>

        <div className="lg:col-span-4">
          <CartTotal />
        </div>
      </div>
    </Section>
  );
}
