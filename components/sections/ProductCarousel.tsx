"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/sections/ProductCard";
import type { Product } from "@/lib/data/products";
import type { SanityImageRef } from "@/sanity/lib/image";

interface ProductCarouselProps {
  products: (Product & { image?: SanityImageRef })[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
      >
        {products.map((product) => (
          <div
            key={product.slug}
            className="w-[45%] sm:w-[31%] lg:w-[19%] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Producto anterior"
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full border border-kd-border bg-white shadow-md hover:bg-kd-surface-alt"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Producto siguiente"
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 items-center justify-center rounded-full border border-kd-border bg-white shadow-md hover:bg-kd-surface-alt"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
