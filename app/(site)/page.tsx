import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero, type HeroBadge, type HeroTitlePart } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { ProductCard } from "@/components/sections/ProductCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LogoStrip } from "@/components/sections/LogoStrip";
import {
  getCategories,
  getClients,
  getPageDoc,
  getProducts,
  getProjects,
} from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "KD Pack | Packaging plástico industrial",
  description:
    "Contenedores, bins, pallets y soluciones plásticas para agricultura, logística, industria y construcción. Fabricación nacional con presencia en LATAM.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "KD Pack | Packaging plástico industrial",
    description:
      "Contenedores, bins, pallets y soluciones plásticas para agricultura, logística, industria y construcción.",
    url: "/",
  },
};

interface HomePageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroPrimaryCta?: { label?: string; href?: string };
  heroSecondaryCta?: { label?: string; href?: string };
  heroBadges?: HeroBadge[];
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
  categoryGridEyebrow?: string;
  categoryGridTitle?: string;
  whyEyebrow?: string;
  whyTitle?: string;
  whyItems?: FeatureItem[];
  productsEyebrow?: string;
  productsTitle?: string;
  projectsEyebrow?: string;
  projectsTitle?: string;
  projectsSubtitle?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  logosTitle?: string;
}

export default async function Home() {
  const [doc, products, projects, categories, clients] = await Promise.all([
    getPageDoc<HomePageDoc>("homePage"),
    getProducts(),
    getProjects(),
    getCategories(),
    getClients(),
  ]);

  const featuredProducts = products
    .filter((p) => p.brand === "kdpack")
    .slice(0, 5);

  const featuredProjects = projects.filter((p) =>
    ["garces-fruit-berries", "frusan-logistica", "almagro-encofrados"].includes(
      p.slug
    )
  );

  const kdPackClients = clients.filter(
    (c) => c.brand === "kdpack" || c.brand === "both"
  );

  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        eyebrow={doc?.heroEyebrow || "KD Pack"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Packaging plástico" },
                { text: "para industrias que" },
                { text: "no pueden detenerse.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Contenedores, bins, pallets y soluciones plásticas para agricultura, logística, industria y construcción."
        }
        primaryCta={{
          label: doc?.heroPrimaryCta?.label || "Ver productos",
          href: doc?.heroPrimaryCta?.href || "/productos",
        }}
        secondaryCta={{
          label: doc?.heroSecondaryCta?.label || "Cotizar proyecto",
          href: doc?.heroSecondaryCta?.href || "/cotiza-tu-proyecto",
        }}
        badges={
          doc?.heroBadges?.length
            ? doc.heroBadges
            : [
                { icon: "award", label: "+15 años fabricando en Chile" },
                { icon: "boxes", label: "+4,5M toneladas al año" },
                { icon: "users", label: "+X clientes activos" },
                { icon: "factory", label: "+30.000 mts2 de planta" },
              ]
        }
        imageAlt="Bins y pallets plásticos KD Pack en planta industrial"
        imageBg="141414"
        image={doc?.heroImage}
        overlayOpacity={doc?.heroOverlayOpacity}
      />

      <CategoryGrid
        eyebrow={doc?.categoryGridEyebrow || "¿Qué solución necesitas?"}
        title={doc?.categoryGridTitle || "Encuentra el producto ideal para tu operación."}
        viewAllHref="/productos"
        viewAllLabel="Ver todos los productos"
        items={categories}
        variant="compact"
      />

      <section className="py-16 lg:py-20 bg-kd-surface-alt">
        <div className="container">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="border-l-2 border-kd-green pl-4">
              <p className="eyebrow font-semibold">
                {doc?.productsEyebrow || "Productos destacados"}
              </p>
              <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                {doc?.productsTitle || "Los más utilizados por nuestros clientes."}
              </h2>
            </div>
            <Link
              href="/productos"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
            >
              Ver todos los productos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <FeatureRow
        eyebrow={doc?.whyEyebrow || "¿Por qué elegir KD Pack?"}
        title={
          doc?.whyTitle ||
          "Un aliado que entiende tu operación y responde cuando más importa."
        }
        background="white"
        items={
          doc?.whyItems?.length
            ? doc.whyItems
            : [
                {
                  icon: "leaf",
                  title: "100% energía renovable",
                  description:
                    "Nuestra planta opera con energía 100% renovable, reduciendo el impacto ambiental de cada producto.",
                },
                {
                  icon: "shield",
                  title: "ISO 9001 en toda la cadena productiva",
                  description:
                    "Certificación ISO 9001 que respalda la calidad y consistencia de todo nuestro proceso productivo.",
                },
                {
                  icon: "shield-plus",
                  title: "Grado alimentario",
                  description:
                    "Productos certificados para contacto directo con alimentos, cumpliendo los estándares más exigentes.",
                },
                {
                  icon: "clock",
                  title: "Cotización en menos de 24 horas",
                  description:
                    "Recibe una propuesta clara y a tiempo, sin esperas que frenen tu operación.",
                },
                {
                  icon: "truck",
                  title: "Despacho express",
                  description:
                    "Entregas rápidas para asegurar continuidad en tu cadena de suministro.",
                },
              ]
        }
      />

      <LogoStrip
        title={
          doc?.logosTitle ||
          "Empresas de múltiples industrias confían en nuestras soluciones"
        }
        clients={kdPackClients.slice(0, 6)}
      />

      <CtaBanner
        eyebrow={doc?.ctaEyebrow}
        title={doc?.ctaTitle}
      />

      <section className="py-16 lg:py-20 bg-kd-black">
        <div className="container">
          <div className="border-l-2 border-kd-green pl-4 max-w-xl">
            <p className="eyebrow font-semibold">
              {doc?.projectsEyebrow || "Proyectos que nos mueven"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-white">
              {doc?.projectsTitle || "Soluciones que generan impacto real."}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70">
              {doc?.projectsSubtitle ||
                "Acompañamos a empresas de múltiples industrias a optimizar sus operaciones con soluciones plásticas eficientes y sostenibles."}
            </p>
          </div>

          <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="dark" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
