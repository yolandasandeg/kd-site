import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero, type HeroBadge, type HeroTitlePart } from "@/components/sections/Hero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Icon } from "@/components/icon-map";
import { getClients, getPageDoc, getProjects } from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Proyectos | Casos de éxito",
  description:
    "Conoce los proyectos reales de KD Pack y Konstruplast: soluciones plásticas que impulsan industrias y construyen futuro en Chile y LATAM.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos | Casos de éxito",
    description:
      "Cada proyecto es el resultado de escuchar, entender y desarrollar la solución exacta que nuestros clientes necesitan.",
    url: "/proyectos",
  },
};

interface StatDoc {
  value: string;
  label: string;
}

interface ProyectosPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroBadges?: HeroBadge[];
  heroImage?: SanityImageRef;
  featuredEyebrow?: string;
  featuredTitle?: string;
  logosEyebrow?: string;
  logosTitle?: string;
  logosBoxText?: string;
  stats?: StatDoc[];
}

const featuredSlugs = [
  "garces-fruit-berries",
  "frusan-logistica",
  "almagro-encofrados",
  "copefrut-pesquera",
  "talley-industrial",
];

const defaultStats: StatDoc[] = [
  { value: "+13 años", label: "de experiencia" },
  { value: "+150", label: "productos desarrollados" },
  { value: "+200", label: "clientes en LATAM" },
  { value: "+10 países", label: "con presencia" },
  { value: "100%", label: "material reciclable" },
];

export default async function ProyectosPage() {
  const [doc, projects, clients] = await Promise.all([
    getPageDoc<ProyectosPageDoc>("proyectosPage"),
    getProjects(),
    getClients(),
  ]);

  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const stats = doc?.stats?.length ? doc.stats : defaultStats;

  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        eyebrow={doc?.heroEyebrow || "Proyectos que generan impacto"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Soluciones plásticas" },
                { text: "que impulsan industrias" },
                { text: "y construyen futuro.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Cada proyecto es el resultado de escuchar, entender y desarrollar la solución exacta que nuestros clientes necesitan para que su operación nunca se detenga."
        }
        primaryCta={{ label: "Cotiza tu proyecto", href: "/cotiza-tu-proyecto" }}
        badges={
          doc?.heroBadges?.length
            ? doc.heroBadges
            : [
                { icon: "wrench", label: "Soluciones a medida" },
                { icon: "globe", label: "Producción confiable" },
                { icon: "clock", label: "Entrega oportuna" },
                { icon: "handshake", label: "Acompañamiento continuo" },
              ]
        }
        imageAlt="Bins plásticos en bodega industrial KD Pack"
        imageBg="141414"
        image={doc?.heroImage}
      />

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="border-l-2 border-kd-green pl-4">
              <p className="eyebrow font-semibold">{doc?.featuredEyebrow || "Casos destacados"}</p>
              <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
                {doc?.featuredTitle || "Proyectos reales, resultados que marcan la diferencia."}
              </h2>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="light" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-kd-surface-alt">
        <div className="container grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="eyebrow font-semibold">
              {doc?.logosEyebrow || "Empresas que confían en nosotros"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.logosTitle || "Trabajamos junto a líderes de múltiples industrias."}
            </h2>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-x-8 gap-y-5">
              {clients.slice(0, 10).map((client) => (
                <span
                  key={client.name}
                  className="text-sm font-bold uppercase tracking-wide text-kd-text-secondary/80"
                >
                  {client.name}
                </span>
              ))}
            </div>
          </div>
          <div className="max-w-xs rounded-xl border border-kd-border bg-white p-6">
            <Icon name="handshake" className="h-8 w-8 text-kd-green" />
            <p className="mt-4 text-sm text-kd-text-secondary leading-relaxed">
              {doc?.logosBoxText ||
                "Más de 200 empresas en Chile y LATAM confían en KD Pack y Konstruplast para desarrollar soluciones plásticas que responden a los desafíos reales de cada operación."}
            </p>
            <Link
              href="/contacto"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
            >
              Sé parte de nuestros clientes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 border-y border-kd-border bg-white">
        <div className="container grid grid-cols-2 sm:grid-cols-5 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-semibold text-kd-text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-kd-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
