"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  imgSrc: string;
};

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

const imageLoader = ({ src, width, quality = 75 }: ImageLoaderParams): string =>
  `${src}?w=${width}&q=${quality}`;

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  return (
    <>
      <section className="w-full py-4">
        <div className="mx-auto lg:max-w-6xl px-3">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="flex flex-col px-4 py-5 sm:p-6">
                    <q className="flex-1 text-gray-600 dark:text-gray-300">
                      {testimonial.quote}
                    </q>
                    <div className="mt-6 flex gap-3">
                      <span className="inline-flex rounded-full">
                        <Image
                          loader={imageLoader}
                          className="h-10 w-10 rounded-full"
                          height={40}
                          width={40}
                          alt={testimonial.name}
                          src={testimonial.imgSrc}
                          loading="lazy"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default function TestimonialSliderDemo() {
  const testimonials = [
    {
      quote: "This is a testimonial",
      name: "John Doe",
      role: "Software Engineer",
      imgSrc: "https://placehold.co/600x400",
    },
    {
      quote: "This is a testimonial",
      name: "John Doe",
      role: "Software Engineer",
      imgSrc: "https://placehold.co/600x400",
    },
    {
      quote: "This is a testimonial",
      name: "John Doe",
      role: "Software Engineer",
      imgSrc: "https://placehold.co/600x400",
    },
    {
      quote: "This is a testimonial",
      name: "John Doe",
      role: "Software Engineer",
      imgSrc: "https://placehold.co/600x400",
    },
    {
      quote: "This is a testimonial",
      name: "John Doe",
      role: "Software Engineer",
      imgSrc: "https://placehold.co/600x400",
    },
    {
      quote: "This is a testimonial",
      name: "John Doe",
      role: "Software Engineer",
      imgSrc: "https://placehold.co/600x400",
    },
  ];
  return <TestimonialSlider testimonials={testimonials} />;
}
