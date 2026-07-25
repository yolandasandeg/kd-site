import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Icon } from "@/components/icon-map";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

export interface CategoryGridItem {
  slug: string;
  name: string;
  description?: string;
  href: string;
  icon: string;
  imageColor: string;
  image?: SanityImageRef;
}

interface CategoryGridProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  items: CategoryGridItem[];
  variant?: "compact" | "detailed";
}

export function CategoryGrid({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "Ver todos los productos",
  items,
  variant = "compact",
}: CategoryGridProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="border-l-2 border-kd-green pl-4 max-w-2xl">
            <p className="eyebrow font-semibold">{eyebrow}</p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary max-w-xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-sm sm:text-base text-kd-text-secondary">
                {subtitle}
              </p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark shrink-0"
            >
              {viewAllLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div
          className={
            variant === "compact"
              ? "mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
              : "mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          }
        >
          {items.map((item) =>
            variant === "compact" ? (
              <Link
                key={item.slug}
                href={item.href}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl"
              >
                <Image
                  src={resolveImageSrc(item.image, item.imageColor, "400x520")}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-kd-green">
                  <Icon name={item.icon} className="h-4.5 w-4.5 text-white" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    {item.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white shrink-0" />
                </div>
              </Link>
            ) : (
              <Link
                key={item.slug}
                href={item.href}
                className="group rounded-xl border border-kd-border bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={resolveImageSrc(item.image, item.imageColor, "640x400")}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-kd-green">
                    <Icon name={item.icon} className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-kd-text-primary">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="mt-1.5 text-sm text-kd-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green group-hover:text-kd-green-dark">
                    Ver soluciones
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )
          )}
        </div>

        {viewAllHref && (
          <div className="mt-6 sm:hidden">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green"
            >
              {viewAllLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
