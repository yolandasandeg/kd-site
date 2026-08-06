"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/components/sections/ProductCard";
import {
  productCategories,
  productTypes,
  productCharacteristics,
  productMaterials,
  categoryBrand,
  type Product,
  type Brand,
} from "@/lib/data/products";
import type { HeroTitlePart } from "@/components/sections/Hero";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

const PAGE_SIZE = 12;

interface ProductsExplorerProps {
  products: (Product & { image?: SanityImageRef })[];
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  searchPlaceholder?: string;
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
}

function toggle(set: Set<string>, value: string) {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <div className="border-b border-kd-border py-5 first:pt-0 last:border-0">
      <h3 className="text-sm font-semibold text-kd-text-primary">{title}</h3>
      <div className="mt-3 space-y-2.5">
        {options.map((option) => {
          const id = `${title}-${option}`.replace(/\s+/g, "-");
          return (
            <div key={option} className="flex items-center gap-2.5">
              <Checkbox
                id={id}
                checked={selected.has(option)}
                onCheckedChange={() => onToggle(option)}
              />
              <Label htmlFor={id} className="text-sm font-normal text-kd-text-secondary cursor-pointer">
                {option}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductsExplorer({
  products,
  heroEyebrow = "Productos",
  heroTitleParts = [
    { text: "Soluciones plásticas" },
    { text: "para cada necesidad.", highlight: true },
  ],
  searchPlaceholder = "Buscar producto, código o categoría...",
  heroImage,
  heroOverlayOpacity = 55,
}: ProductsExplorerProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria");
  const marcaParam = searchParams.get("marca");

  const resolvedBrand: Brand =
    marcaParam === "kdpack" || marcaParam === "konstruplast"
      ? marcaParam
      : (initialCategory && categoryBrand[initialCategory]) || "kdpack";

  const brandProducts = React.useMemo(
    () => products.filter((p) => p.brand === resolvedBrand),
    [products, resolvedBrand]
  );

  const availableCategories = React.useMemo(
    () =>
      productCategories.filter((c) =>
        brandProducts.some((p) => p.category === c.slug)
      ),
    [brandProducts]
  );

  const availableTypes = React.useMemo(() => {
    const present = new Set(brandProducts.map((p) => p.productType));
    const ordered = productTypes.filter((t) => present.has(t));
    const extra = Array.from(present).filter((t) => !productTypes.includes(t));
    return [...ordered, ...extra];
  }, [brandProducts]);

  const availableCharacteristics = React.useMemo(() => {
    const present = new Set(brandProducts.flatMap((p) => p.features));
    return productCharacteristics.filter((c) => present.has(c));
  }, [brandProducts]);

  const availableMaterials = React.useMemo(() => {
    const present = brandProducts.map((p) => p.material);
    return productMaterials.filter((m) => present.some((p) => p.includes(m)));
  }, [brandProducts]);

  const [search, setSearch] = React.useState("");
  const [categories, setCategories] = React.useState<Set<string>>(
    () => new Set(initialCategory ? [initialCategory] : [])
  );
  const [types, setTypes] = React.useState<Set<string>>(new Set());
  const [characteristics, setCharacteristics] = React.useState<Set<string>>(
    new Set()
  );
  const [materials, setMaterials] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  React.useEffect(() => {
    setPage(1);
  }, [search, categories, types, characteristics, materials]);

  const filtered = React.useMemo(() => {
    return brandProducts.filter((p) => {
      if (
        search &&
        !`${p.name} ${p.code}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (categories.size > 0 && !categories.has(p.category)) return false;
      if (types.size > 0 && !types.has(p.productType)) return false;
      if (
        characteristics.size > 0 &&
        !p.features.some((f) => characteristics.has(f))
      )
        return false;
      if (
        materials.size > 0 &&
        !Array.from(materials).some((m) => p.material.includes(m))
      )
        return false;
      return true;
    });
  }, [brandProducts, search, categories, types, characteristics, materials]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const activeTab = categories.size === 1 ? Array.from(categories)[0] : null;

  const hasActiveFilters =
    categories.size + types.size + characteristics.size + materials.size > 0;

  function clearFilters() {
    setCategories(new Set());
    setTypes(new Set());
    setCharacteristics(new Set());
    setMaterials(new Set());
  }

  const filtersPanel = (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-kd-text-primary">
          Filtrar productos
        </h2>
      </div>
      <FilterGroup
        title="Categoría"
        options={availableCategories.map((c) => c.label)}
        selected={
          new Set(
            Array.from(categories).map(
              (slug) =>
                availableCategories.find((c) => c.slug === slug)?.label ?? slug
            )
          )
        }
        onToggle={(label) => {
          const slug =
            availableCategories.find((c) => c.label === label)?.slug ?? label;
          setCategories((prev) => toggle(prev, slug));
        }}
      />
      <FilterGroup
        title="Tipo de producto"
        options={availableTypes}
        selected={types}
        onToggle={(v) => setTypes((prev) => toggle(prev, v))}
      />
      <FilterGroup
        title="Características"
        options={availableCharacteristics}
        selected={characteristics}
        onToggle={(v) => setCharacteristics((prev) => toggle(prev, v))}
      />
      <FilterGroup
        title="Material"
        options={availableMaterials}
        selected={materials}
        onToggle={(v) => setMaterials((prev) => toggle(prev, v))}
      />
      {hasActiveFilters && (
        <Button variant="outline" size="sm" className="mt-2 w-full" onClick={clearFilters}>
          <X className="h-3.5 w-3.5" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <>
      <section className="relative overflow-hidden bg-kd-black">
        {heroImage?.asset?._ref && (
          <div className="absolute inset-0">
            <Image
              src={resolveImageSrc(heroImage, "141414", "1600x500")}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-kd-black"
              style={{
                opacity: (Math.min(100, Math.max(0, heroOverlayOpacity)) / 100) * 0.7,
              }}
            />
          </div>
        )}
        <div className="relative container py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="eyebrow font-semibold">{heroEyebrow}</p>
              <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                {heroTitleParts.map((part, i) => (
                  <span key={i} className={part.highlight ? "text-kd-green" : undefined}>
                    {part.text}{" "}
                  </span>
                ))}
              </h1>
            </div>
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-kd-text-secondary" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Buscar producto, código o categoría"
                className="h-11 pl-11 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-kd-border bg-white">
        <div className="container flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => setCategories(new Set())}
            className={cn(
              "shrink-0 text-sm font-medium pb-1 border-b-2 transition-colors",
              activeTab === null
                ? "border-kd-green text-kd-green"
                : "border-transparent text-kd-text-secondary hover:text-kd-text-primary"
            )}
          >
            Todos los productos
          </button>
          {availableCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategories(new Set([c.slug]))}
              className={cn(
                "shrink-0 text-sm font-medium pb-1 border-b-2 transition-colors",
                activeTab === c.slug
                  ? "border-kd-green text-kd-green"
                  : "border-transparent text-kd-text-secondary hover:text-kd-text-primary"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <section className="py-10 lg:py-14">
        <div className="container grid lg:grid-cols-[260px_1fr] gap-10">
          <aside className="hidden lg:block">{filtersPanel}</aside>

          <div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-kd-text-secondary">
                Mostrando{" "}
                <span className="font-semibold text-kd-text-primary">
                  {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(currentPage * PAGE_SIZE, filtered.length)}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-kd-text-primary">
                  {filtered.length}
                </span>{" "}
                productos
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 rounded-lg border border-kd-border px-3 py-2 text-sm font-medium"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </button>
                <div className="hidden sm:flex items-center rounded-lg border border-kd-border overflow-hidden">
                  <button
                    aria-label="Vista de cuadrícula"
                    onClick={() => setView("grid")}
                    className={cn(
                      "h-9 w-9 flex items-center justify-center",
                      view === "grid" ? "bg-kd-green text-white" : "text-kd-text-secondary"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Vista de lista"
                    onClick={() => setView("list")}
                    className={cn(
                      "h-9 w-9 flex items-center justify-center",
                      view === "list" ? "bg-kd-green text-white" : "text-kd-text-secondary"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {mobileFiltersOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}>
                <div
                  className="absolute right-0 top-0 h-full w-[85%] max-w-xs bg-white p-5 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold">Filtros</span>
                    <button onClick={() => setMobileFiltersOpen(false)} aria-label="Cerrar filtros">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  {filtersPanel}
                </div>
              </div>
            )}

            {paginated.length > 0 ? (
              <div
                className={cn(
                  "mt-6 grid gap-5",
                  view === "grid"
                    ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-2"
                )}
              >
                {paginated.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-14 text-center text-kd-text-secondary">
                No encontramos productos con esos filtros. Prueba ajustando tu
                búsqueda.
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 flex items-center justify-center rounded-lg border border-kd-border disabled:opacity-40"
                  aria-label="Página anterior"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(0, 7)
                  .map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={cn(
                        "h-9 w-9 flex items-center justify-center rounded-lg border text-sm font-medium",
                        n === currentPage
                          ? "border-kd-green bg-kd-green text-white"
                          : "border-kd-border text-kd-text-primary hover:bg-kd-surface-alt"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 flex items-center justify-center rounded-lg border border-kd-border disabled:opacity-40"
                  aria-label="Página siguiente"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
