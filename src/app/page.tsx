import { Suspense } from "react";

import Hero from "@/components/home/Hero";
import SectionTitle from "@/components/SectionTitle";
import FeaturedProducts from "@/features/product/components/FeaturedProducts";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  return (
    <div className="space-y-24">
      <Hero />

      <div className="space-y-8">
        <SectionTitle text="Featured Products" />

        <Suspense fallback={<Spinner />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </div>
  );
}
