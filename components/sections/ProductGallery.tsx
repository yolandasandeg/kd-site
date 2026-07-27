"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = React.useState(0);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-kd-surface-alt">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${alt}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-kd-surface-alt ring-2 transition-all",
                i === active ? "ring-kd-green" : "ring-transparent hover:ring-kd-border"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
