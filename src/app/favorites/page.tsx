import { Metadata } from "next";

import Section from "@/components/Section";
import ProductGrid from "@/features/product/components/ProductGrid";

import { getFavorites } from "@/features/favorite/utils/actions";

export const metadata: Metadata = {
  title: "Favorites",
};

export default async function FavoritesPage() {
  const favorites = await getFavorites();

  return (
    <Section title="Favorites">
      <ProductGrid products={favorites.map((favorite) => favorite.product)} />
    </Section>
  );
}
