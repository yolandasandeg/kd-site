import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Layers3 } from "lucide-react";

import type { Product } from "@/lib/data/products";
import { productCategories } from "@/lib/data/products";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

function categoryLabel(category: string) {
  return (
    productCategories.find((c) => c.slug === category)?.label ??
    category.replace(/-/g, " ")
  );
}

export function ProductCard({
  product,
}: {
  product: Product & { image?: SanityImageRef };
}) {
  return (
    <div className="group flex flex-col rounded-xl border border-kd-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-kd-surface-alt">
        <Image
          src={resolveImageSrc(product.image, product.imageColor, "480x360")}
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

        <Link
          href={`/productos/${product.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
        >
          Ver producto
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
