import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import hero1 from "@/assets/images/carousel/hero1.jpg";
import hero2 from "@/assets/images/carousel/hero2.jpg";
import hero3 from "@/assets/images/carousel/hero3.jpg";
import hero4 from "@/assets/images/carousel/hero4.jpg";

const images = [hero1, hero2, hero3, hero4];

export default function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="p-1 shadow-none">
                <CardContent className="p-1">
                  <Image
                    src={image}
                    alt="Hero"
                    className="w-full h-96 rounded object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />

        <CarouselNext />
      </Carousel>
    </div>
  );
}
