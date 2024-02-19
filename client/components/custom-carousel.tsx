import * as React from "react"
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CustomCarousel() {
  return (
    <Carousel
      className="mt-10"
      plugins={[
        Autoplay({
          delay: 3500,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Intuitive learning</p>
              <h4 className="text-white font-medium text-large">Optimize your studying</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="/resources/placeholder7.jpg"
            />
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">High tech</p>
              <h4 className="text-white font-medium text-large">Utilize filters and sorting</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="/resources/placeholder2.jpeg"
            />
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Get going fast</p>
              <h4 className="text-white font-medium text-large">Easy setup</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="/resources/placeholder5.jpg"
            />
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
