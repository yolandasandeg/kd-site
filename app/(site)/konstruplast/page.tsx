import type { Metadata } from "next";

import { Hero, type HeroBadge, type HeroTitlePart } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { ProductCard } from "@/components/sections/ProductCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LogoStrip } from "@/components/sections/LogoStrip";
import {
  getClients,
  getKonstruplastApplications,
  getPageDoc,
  getProducts,
  getProjects,
} from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Konstruplast | Soluciones plásticas para construcción",
  description:
    "Encofrados, separadores, tapas de seguridad y alivianantes plásticos para obras más eficientes, robustas y sostenibles.",
  alternates: { canonical: "/konstruplast" },
  openGraph: {
    title: "Konstruplast | Soluciones plásticas para construcción",
    description:
      "Elementos plásticos diseñados para optimizar procesos constructivos, mejorar la seguridad y aumentar la durabilidad de cada proyecto.",
    url: "/konstruplast",
  },
};

interface KonstruplastPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroPrimaryCta?: { label?: string; href?: string };
  heroSecondaryCta?: { label?: string; href?: string };
  heroBadges?: HeroBadge[];
  heroImage?: SanityImageRef;
  applicationsEyebrow?: string;
  applicationsTitle?: string;
  productsEyebrow?: string;
  productsTitle?: string;
  whyEyebrow?: string;
  whyTitle?: string;
  whyItems?: FeatureItem[];
  projectsEyebrow?: string;
  projectsTitle?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  logosTitle?: string;
}

const konstruplastProjectSlugs = [
  "edificio-residencial-santiago",
  "planta-industrial-antofagasta",
  "mejoramiento-infraestructura-valparaiso",
];

export default async function KonstruplastPage() {
  const [doc, applications, products, projects, clients] = await Promise.all([
    getPageDoc<KonstruplastPageDoc>("konstruplastPage"),
    getKonstruplastApplications(),
    getProducts(),
    getProjects(),
    getClients(),
  ]);

  const applicationItems = applications.map((app) => ({
    slug: app.slug,
    name: app.name,
    description: app.description,
    href: `/productos?categoria=${app.slug}`,
    icon: app.icon,
    imageColor: "141414",
  }));

  const featuredProducts = products.filter((p) => p.brand === "konstruplast");

  const featuredProjects = projects.filter((p) =>
    konstruplastProjectSlugs.includes(p.slug)
  );

  const konstruplastClients = clients.filter(
    (c) => c.brand === "konstruplast" || c.brand === "both"
  );

  return (
    <>
      <Hero
        variant="light"
        eyebrow={doc?.heroEyebrow || "Konstruplast"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Soluciones plásticas" },
                { text: "para construcción" },
                { text: "más eficiente y robusta.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Elementos plásticos diseñados para optimizar procesos constructivos, mejorar la seguridad y aumentar la durabilidad de cada proyecto."
        }
        primaryCta={{
          label: doc?.heroPrimaryCta?.label || "Ver productos",
          href: doc?.heroPrimaryCta?.href || "/productos?categoria=encofrados",
        }}
        secondaryCta={{
          label: doc?.heroSecondaryCta?.label || "Cotizar proyecto",
          href: doc?.heroSecondaryCta?.href || "/cotiza-tu-proyecto",
        }}
        badges={
          doc?.heroBadges?.length
            ? doc.heroBadges
            : [
                { icon: "shield", label: "Alta resistencia y durabilidad" },
                { icon: "recycle", label: "Material 100% reciclable" },
                { icon: "clock", label: "Optimiza tiempos y costos" },
                { icon: "truck", label: "Despacho a todo Chile y LATAM" },
              ]
        }
        imageAlt="Elementos de encofrado plástico Konstruplast en obra de construcción"
        imageBg="3f3f3a"
        image={doc?.heroImage}
      />

      <CategoryGrid
        eyebrow={doc?.applicationsEyebrow || "Soluciones para cada etapa"}
        title={doc?.applicationsTitle || "Aplicaciones que impulsan cada construcción."}
        viewAllHref="/productos"
        viewAllLabel="Ver todas las soluciones"
        items={applicationItems}
        variant="detailed"
      />

      <section className="py-16 lg:py-20 bg-kd-surface-alt">
        <div className="container">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="border-l-2 border-kd-green pl-4">
              <p className="eyebrow font-semibold">
                {doc?.productsEyebrow || "Productos destacados"}
              </p>
              <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                {doc?.productsTitle || "Diseñados para rendimiento y durabilidad."}
              </h2>
            </div>
            <a
              href="/productos?categoria=encofrados"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
            >
              Ver todos los productos
            </a>
          </div>

          <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <FeatureRow
        eyebrow={doc?.whyEyebrow || "¿Por qué Konstruplast?"}
        title={doc?.whyTitle || "Innovación que construye resultados concretos."}
        background="white"
        items={
          doc?.whyItems?.length
            ? doc.whyItems
            : [
                { icon: "shield", title: "Resistencia", description: "Productos de alta resistencia mecánica y química." },
                { icon: "award", title: "Durabilidad", description: "Materiales diseñados para una vida útil prolongada." },
                { icon: "clock", title: "Eficiencia", description: "Agilizan procesos constructivos y reducen costos." },
                { icon: "recycle", title: "Sostenibilidad", description: "Plásticos reciclables que aportan a la construcción sostenible." },
                { icon: "users", title: "Asesoría técnica", description: "Acompañamiento en el diseño y ejecución de tu proyecto." },
              ]
        }
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="border-l-2 border-kd-green pl-4 max-w-xl">
              <p className="eyebrow font-semibold">
                {doc?.projectsEyebrow || "Proyectos destacados"}
              </p>
              <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                {doc?.projectsTitle || "Acompañamos obras que construyen el futuro."}
              </h2>
            </div>
            <a
              href="/proyectos"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
            >
              Ver todos los proyectos
            </a>
          </div>

          <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="light" />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || "¿Tienes un proyecto en mente?"}
        title={doc?.ctaTitle || "Hablemos y encontremos la solución ideal para tu obra."}
      />
      <LogoStrip
        title={doc?.logosTitle || "Empresas que confían en nuestras soluciones"}
        clients={konstruplastClients}
      />
    </>
  );
}
