import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Layers3 } from "lucide-react";

import type { Product } from "@/lib/data/products";
import { productCategories } from "@/lib/data/products";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";
import { AddToQuoteButton } from "@/components/cart/AddToQuoteButton";

function categoryLabel(category: string) {
  return (
    productCategories.find((c) => c.slug === category)?.label ??
    category.replace(/-/g, " ")
  );
}

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product & { image?: SanityImageRef };
  /** "list" = fila compacta con foto chica, para escanear muchos productos. */
  variant?: "grid" | "list";
}) {
  const imageSrc = resolveImageSrc(product.image, product.imageColor, "480x360");

  if (variant === "list") {
    return (
      <div className="group relative flex items-center gap-4 rounded-xl border border-kd-border bg-white p-3 transition-all duration-200 hover:border-kd-green hover:shadow-md">
        <Link
          href={`/productos/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-kd-surface-alt">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="eyebrow font-semibold">{categoryLabel(product.category)}</p>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-kd-text-primary">
            {product.name}
          </h3>
          <p className="text-xs text-kd-text-secondary">{product.code}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-kd-text-secondary">
            <span className="inline-flex items-center gap-1">
              <Ruler className="h-3 w-3 shrink-0 text-kd-green" />
              {product.size}
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers3 className="h-3 w-3 shrink-0 text-kd-green" />
              {product.material}
            </span>
          </div>
        </div>

        <div className="relative z-20 flex shrink-0 items-center gap-2">
          <Link
            href={`/productos/${product.slug}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
          >
            Ver
            <ArrowRight className="h-4 w-4" />
          </Link>
          <AddToQuoteButton
            slug={product.slug}
            name={product.name}
            code={product.code}
            imageSrc={imageSrc}
            iconOnly
            className="h-8 w-8 shrink-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-xl border border-kd-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/productos/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-kd-surface-alt">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow font-semibold">{categoryLabel(product.category)}</p>
        <h3 className="mt-1.5 text-base font-semibold text-kd-text-primary">
          {product.name}
        </h3>
        <p className="text-xs text-kd-text-secondary">{product.code}</p>

        <div className="mt-3 space-y-1.5 text-xs text-kd-text-secondary">
          <div className="flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5 text-kd-green shrink-0" />
            <span>{product.size}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers3 className="h-3.5 w-3.5 text-kd-green shrink-0" />
            <span>{product.material}</span>
          </div>
        </div>

        <div className="relative z-20 mt-4 flex items-center justify-between gap-2">
          <Link
            href={`/productos/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
          >
            Ver producto
            <ArrowRight className="h-4 w-4" />
          </Link>
          <AddToQuoteButton
            slug={product.slug}
            name={product.name}
            code={product.code}
            imageSrc={imageSrc}
            iconOnly
            className="h-8 w-8 shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
