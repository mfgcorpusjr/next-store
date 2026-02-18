import Link from "next/link";

import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function Hero() {
  return (
    <div className="grid lg:grid-cols-2 gap-24">
      <div className="flex flex-col items-center lg:items-start gap-8">
        <h2 className="text-4xl lg:text-5xl text-center lg:text-left  font-black tracking-tight">
          We are changing the way people shop
        </h2>

        <p className="text-muted-foreground text-center lg:text-left leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
          ut asperiores a tempore facilis blanditiis doloribus sunt sapiente
          maxime dolore.
        </p>

        <Button asChild size="lg" className="w-full md:w-auto">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>

      <HeroCarousel />
    </div>
  );
}
