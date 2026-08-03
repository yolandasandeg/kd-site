import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero, type HeroBadge, type HeroTitlePart } from "@/components/sections/Hero";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { SealsStrip, type SealItem } from "@/components/sections/SealsStrip";
import { ProductCard } from "@/components/sections/ProductCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LogoStrip } from "@/components/sections/LogoStrip";
import {
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
  whyEyebrow?: string;
  whyTitle?: string;
  whyItems?: FeatureItem[];
  whySealsTitle?: string;
  whySeals?: SealItem[];
  productsEyebrow?: string;
  productsTitle?: string;
  industriesEyebrow?: string;
  industriesTitle?: string;
  industriesItems?: SealItem[];
  projectsEyebrow?: string;
  projectsTitle?: string;
  projectsSubtitle?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  logosTitle?: string;
}

export default async function Home() {
  const [doc, products, projects, clients] = await Promise.all([
    getPageDoc<HomePageDoc>("homePage"),
    getProducts(),
    getProjects(),
    getClients(),
  ]);

  // Curated by likely search demand: arándanos and erizos are Chile's flagship
  // export categories, plus generic high-volume terms (bins, cajas expo).
  // Falls back to the first 5 KD Pack products if any curated slug is missing
  // (e.g. if Sanity is briefly unreachable and static fallback data is used
  // instead) so this section never silently renders empty.
  const featuredProductSlugs = ["bins-001", "ag-001", "ag-025k3", "ag-062", "esp-011"];
  const kdpackProducts = products.filter((p) => p.brand === "kdpack");
  const curatedFeaturedProducts = featuredProductSlugs
    .map((slug) => kdpackProducts.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p));
  const featuredProducts =
    curatedFeaturedProducts.length === featuredProductSlugs.length
      ? curatedFeaturedProducts
      : kdpackProducts.slice(0, 5);

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
                { text: "Soluciones plásticas" },
                { text: "para industrias que" },
                { text: "no pueden detenerse.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Fabricamos en Chile para agricultura, acuicultura, forestal, construcción, logística y más."
        }
        primaryCta={{
          label: doc?.heroPrimaryCta?.label || "Ver productos",
          href: doc?.heroPrimaryCta?.href || "/productos?marca=kdpack",
        }}
        secondaryCta={{
          label: doc?.heroSecondaryCta?.label || "Cotizar proyecto",
          href: doc?.heroSecondaryCta?.href || "/cotiza-tu-proyecto",
        }}
        primaryVariant="outlineLight"
        secondaryVariant="default"
        badges={
          doc?.heroBadges?.length
            ? doc.heroBadges
            : [
                { icon: "award", label: "+15 años\nfabricando en Chile" },
                { icon: "boxes", label: "+4.500 toneladas al año" },
                { icon: "users", label: "+X clientes activos" },
                { icon: "leaf", label: "100% energía renovable" },
              ]
        }
        imageAlt="Bins y pallets plásticos KD Pack en planta industrial"
        imageBg="141414"
        image={doc?.heroImage}
        overlayOpacity={doc?.heroOverlayOpacity}
      />

      <LogoStrip
        title={
          doc?.logosTitle ||
          "Empresas de múltiples industrias confían en nuestras soluciones"
        }
        clients={kdPackClients.slice(0, 6)}
      />

      <section className="py-16 lg:py-20">
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
              href="/productos?marca=kdpack"
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
        eyebrow={doc?.industriesEyebrow || "Industrias"}
        title={
          doc?.industriesTitle ||
          "Soluciones especializadas para cada sector que impulsamos."
        }
        background="alt"
        items={
          doc?.industriesItems?.length
            ? doc.industriesItems.map((i) => ({ icon: i.icon, title: i.label }))
            : [
                { icon: "leaf", title: "Agricultura" },
                { icon: "fish", title: "Acuicultura" },
                { icon: "trees", title: "Forestal" },
                { icon: "building-2", title: "Construcción" },
                { icon: "truck", title: "Logística" },
                { icon: "star", title: "Proyectos especiales" },
              ]
        }
      />

      <section className="py-16 lg:py-20">
        <FeatureRow
          eyebrow={doc?.whyEyebrow || "¿Por qué elegir KD Pack?"}
          title={
            doc?.whyTitle ||
            "Un aliado que entiende tu operación y responde cuando más importa."
          }
          background="white"
          layout="card"
          items={
            doc?.whyItems?.length
              ? doc.whyItems
              : [
                  {
                    icon: "warehouse",
                    title: "Continuidad de suministro",
                    description:
                      "Fabricamos en Paine con stock permanente: entrega y reposición rápida, sin depender de un contenedor en camino.",
                  },
                  {
                    icon: "shield-plus",
                    title: "Durabilidad comprobada en terreno",
                    description:
                      "Diseñados para el uso rudo real: sol, frío, golpes y ciclos intensivos de carga. Menos recambio y menor costo por año de uso.",
                  },
                  {
                    icon: "sparkles",
                    title: "Innovación en materiales y procesos",
                    description:
                      "Mejoramos continuamente diseños, materiales y procesos, validados por certificaciones técnicas independientes como DICTUC.",
                  },
                  {
                    icon: "cog",
                    title: "Desarrollo a medida",
                    description:
                      "Nuestro equipo de ingeniería trabaja con el tuyo para desarrollar la solución que tu operación necesita: desde el diseño hasta la producción en serie.",
                  },
                ]
          }
        />

        <SealsStrip
          title={doc?.whySealsTitle}
          items={
            doc?.whySeals?.length
              ? doc.whySeals
              : [
                  { icon: "shield", label: "ISO 9001" },
                  { icon: "building", label: "SERVIU" },
                  { icon: "award", label: "DICTUC" },
                  { icon: "leaf", label: "Energía renovable" },
                  { icon: "recycle", label: "Materia prima reciclada" },
                ]
          }
        />
      </section>

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

      <CtaBanner
        eyebrow={doc?.ctaEyebrow}
        title={doc?.ctaTitle}
      />
    </>
  );
}
