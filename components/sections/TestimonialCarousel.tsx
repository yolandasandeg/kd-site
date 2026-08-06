"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

export interface TestimonialCarouselItem {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  photo?: SanityImageRef;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialCarouselItem[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
      >
        {testimonials.map((t) => (
          <div
            key={t.author}
            className="w-[85%] sm:w-[60%] lg:w-[46%] shrink-0 snap-start rounded-xl border border-kd-border bg-white p-6"
          >
            <p className="text-sm sm:text-base text-kd-text-secondary leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-kd-surface-alt">
                <Image
                  src={resolveImageSrc(t.photo, "1f2937", "88x88")}
                  alt={t.author}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-kd-text-primary">
                  {t.author}
                </p>
                <p className="text-xs text-kd-text-secondary">
                  {[t.role, t.company].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Testimonio anterior"
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full border border-kd-border bg-white shadow-md hover:bg-kd-surface-alt"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Testimonio siguiente"
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 items-center justify-center rounded-full border border-kd-border bg-white shadow-md hover:bg-kd-surface-alt"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
