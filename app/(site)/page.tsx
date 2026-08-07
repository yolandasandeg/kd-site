import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero, type HeroBadge, type HeroTitlePart } from "@/components/sections/Hero";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { SealsStrip, type SealItem } from "@/components/sections/SealsStrip";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LogoStrip } from "@/components/sections/LogoStrip";
import {
  getClients,
  getHomePage,
  getProducts,
  getProjects,
} from "@/sanity/lib/queries";
import type { Product } from "@/lib/data/products";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Packaging plástico industrial",
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
  featuredProducts?: (Product & { image?: SanityImageRef })[];
  industriesEyebrow?: string;
  industriesTitle?: string;
  industriesItems?: { name?: string; href?: string; icon?: string; image?: SanityImageRef }[];
  projectsEyebrow?: string;
  projectsTitle?: string;
  projectsSubtitle?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  logosTitle?: string;
}

const defaultIndustries = [
  { slug: "agricola", name: "Agrícola", href: "/productos?categoria=agricola", icon: "leaf" },
  { slug: "construccion", name: "Construcción", href: "/industrias/construccion", icon: "building-2" },
  { slug: "logistica", name: "Logística", href: "/productos?categoria=almacenaje", icon: "truck" },
  { slug: "forestal", name: "Forestal", href: "/productos?categoria=forestal", icon: "trees" },
  { slug: "pesca", name: "Pesca", href: "/productos?categoria=pesca", icon: "fish" },
];

export default async function Home() {
  const [doc, products, projects, clients] = await Promise.all([
    getHomePage<HomePageDoc>(),
    getProducts(),
    getProjects(),
    getClients(),
  ]);

  // Curated by likely search demand: arándanos, cerezas and erizos are
  // Chile's flagship export categories, plus generic high-volume terms
  // (bins, cajas expo). Falls back to the first 10 KD Pack products if any
  // curated slug is missing (e.g. if Sanity is briefly unreachable and
  // static fallback data is used instead) so this section never silently
  // renders empty. Editors can override this whole list from Sanity via
  // homePage.featuredProducts.
  const featuredProductSlugs = [
    "bins-001",
    "ag-001",
    "ag-025k3",
    "ag-062",
    "esp-011",
    "ag-004k2",
    "ag-035",
    "ag-026",
    "bins-002",
    "ag-021",
  ];
  const kdpackProducts = products.filter((p) => p.brand === "kdpack");
  const curatedFeaturedProducts = featuredProductSlugs
    .map((slug) => kdpackProducts.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p));
  const featuredProducts = doc?.featuredProducts?.length
    ? doc.featuredProducts
    : curatedFeaturedProducts.length === featuredProductSlugs.length
      ? curatedFeaturedProducts
      : kdpackProducts.slice(0, 10);

  // Construction first (most visually impressive projects), agrícola last.
  const featuredProjectSlugs = [
    "metro-santiago",
    "almagro-encofrados",
    "garces-fruit-berries",
  ];
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  const kdPackClients = clients.filter(
    (c) => c.brand === "kdpack" || c.brand === "both"
  );

  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Soluciones plásticas" },
                { text: "para industrias que" },
                { text: "no pueden detenerse.", highlight: true },
              ]
        }
        subtitle={doc?.heroSubtitle || "Fabricamos en Chile para Chile."}
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
                { icon: "award", label: "+15 años en Chile" },
                { icon: "boxes", label: "+4.500 ton/año" },
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
        clients={kdPackClients}
      />

      <FeatureRow
        eyebrow={doc?.industriesEyebrow || "Industrias"}
        title={
          doc?.industriesTitle ||
          "Soluciones especializadas para cada sector que impulsamos."
        }
        background="white"
        layout="card"
        items={
          doc?.industriesItems?.length
            ? doc.industriesItems.map((i) => ({
                icon: i.icon || "star",
                title: i.name || "",
                href: i.href || "/productos",
              }))
            : defaultIndustries.map((i) => ({
                icon: i.icon,
                title: i.name,
                href: i.href,
              }))
        }
      />

      <section className="py-10 lg:py-14">
        <div className="container">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="border-l-2 border-kd-green pl-4">
              <p className="eyebrow font-semibold">
                {doc?.productsEyebrow || "Productos destacados"}
              </p>
            </div>
            <Link
              href="/productos?marca=kdpack"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
            >
              Ver todos los productos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9">
            <ProductCarousel products={featuredProducts} />
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

        <div className="bg-white pb-16 lg:pb-20">
          <SealsStrip
            title={doc?.whySealsTitle}
            items={
              doc?.whySeals?.length
                ? doc.whySeals
                : [
                    {
                      icon: "shield",
                      label: "ISO 9001",
                      description: "Norma internacional de gestión de calidad que certifica procesos consistentes y orientados a la mejora continua.",
                    },
                    {
                      icon: "building",
                      label: "SERVIU",
                      description: "Servicio de Vivienda y Urbanización de Chile: supervisa el cumplimiento de estándares técnicos en obras de construcción.",
                    },
                    {
                      icon: "award",
                      label: "DICTUC",
                      description: "Organismo de certificación técnica ligado a la Universidad Católica que valida el cumplimiento de normas de calidad e ingeniería.",
                    },
                    {
                      icon: "leaf",
                      label: "Energía renovable",
                      description: "Certificado RENOVA que acredita que nuestra planta opera con energía eléctrica 100% renovable.",
                    },
                    {
                      icon: "recycle",
                      label: "Materia prima reciclada",
                      description: "Incorporamos materiales reciclables y reciclados en nuestros procesos, reduciendo el impacto ambiental de cada producto.",
                    },
                  ]
            }
          />
        </div>

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
