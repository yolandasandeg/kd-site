import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Ruler, Layers3, Tag, Boxes } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/sections/ProductCard";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { AddToQuoteButton } from "@/components/cart/AddToQuoteButton";
import { products as staticProducts, productCategories } from "@/lib/data/products";
import { getProducts } from "@/sanity/lib/queries";
import { resolveImageSrc } from "@/sanity/lib/image";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return staticProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} (${product.code})`,
    description: product.description,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      title: `${product.name} | KD Plus`,
      description: product.description,
      url: `/productos/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const categoryLabel =
    productCategories.find((c) => c.slug === product.category)?.label ??
    product.category.replace(/-/g, " ");
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);
  const imageSrc = resolveImageSrc(product.image, product.imageColor, "900x900");
  const galleryImages = [
    imageSrc,
    ...(product.gallery ?? []).map((img) => resolveImageSrc(img, product.imageColor, "900x900")),
  ];

  return (
    <>
      <section className="border-b border-kd-border bg-white">
        <div className="container py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-kd-text-secondary">
            <Link href="/" className="hover:text-kd-green">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/productos" className="hover:text-kd-green">
              Productos
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-kd-text-primary">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-14">
          <ProductGallery images={galleryImages} alt={product.name} />

          <div>
            <p className="eyebrow font-semibold">{categoryLabel}</p>
            <h1 className="mt-2 text-h1-mobile lg:text-h2-desktop text-kd-text-primary">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-kd-text-secondary">
              Código: {product.code}
            </p>

            <p className="mt-5 text-sm sm:text-base text-kd-text-secondary leading-relaxed">
              {product.description}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-kd-border p-5">
              <div className="flex items-start gap-2.5">
                <Ruler className="h-4.5 w-4.5 text-kd-green shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs text-kd-text-secondary">Dimensiones</dt>
                  <dd className="text-sm font-medium text-kd-text-primary">
                    {product.size}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Layers3 className="h-4.5 w-4.5 text-kd-green shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs text-kd-text-secondary">Material</dt>
                  <dd className="text-sm font-medium text-kd-text-primary">
                    {product.material}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Tag className="h-4.5 w-4.5 text-kd-green shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs text-kd-text-secondary">Tipo de producto</dt>
                  <dd className="text-sm font-medium text-kd-text-primary">
                    {product.productType}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Boxes className="h-4.5 w-4.5 text-kd-green shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs text-kd-text-secondary">Categoría</dt>
                  <dd className="text-sm font-medium text-kd-text-primary">
                    {categoryLabel}
                  </dd>
                </div>
              </div>
            </dl>

            {product.features.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-kd-text-secondary">
                  Características
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-kd-green-light px-3 py-1 text-xs font-medium text-kd-green-dark"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/cotiza-tu-proyecto">
                  Cotizar este producto
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <AddToQuoteButton
                slug={product.slug}
                name={product.name}
                code={product.code}
                imageSrc={imageSrc}
                size="lg"
              />
              <Button asChild size="lg" variant="outline">
                <Link href="/productos">Ver más productos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-14 lg:py-16 bg-kd-surface-alt">
          <div className="container">
            <div className="border-l-2 border-kd-green pl-4">
              <p className="eyebrow font-semibold">También te puede interesar</p>
              <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                Productos relacionados.
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
