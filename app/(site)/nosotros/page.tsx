import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Icon } from "@/components/icon-map";
import { getPageDoc } from "@/sanity/lib/queries";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Nosotros | Quiénes somos",
  description:
    "KD Pack diseña y fabrica soluciones plásticas de alto rendimiento para sectores que exigen calidad, continuidad y confianza. Conoce nuestra historia, valores y certificaciones.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros | Quiénes somos",
    description:
      "En KD Pack desarrollamos y fabricamos soluciones plásticas de alto rendimiento para sectores que exigen calidad, continuidad y confianza.",
    url: "/nosotros",
  },
};

interface StatItemDoc {
  icon: string;
  value: string;
  label: string;
}

interface WorkingWayItemDoc {
  icon: string;
  title: string;
  description?: string;
  image?: SanityImageRef;
}

interface NosotrosPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroCtaLabel?: string;
  heroImage?: SanityImageRef;
  stats?: StatItemDoc[];
  historiaEyebrow?: string;
  historiaTitle?: string;
  historiaParagraphs?: string[];
  historiaImage?: SanityImageRef;
  valoresEyebrow?: string;
  valoresTitle?: string;
  valoresItems?: FeatureItem[];
  workingWaysEyebrow?: string;
  workingWaysTitle?: string;
  workingWaysItems?: WorkingWayItemDoc[];
  certificationsEyebrow?: string;
  certificationsTitle?: string;
  certifications?: string[];
  certificationsText?: string;
  teamImage?: SanityImageRef;
  ctaEyebrow?: string;
  ctaTitle?: string;
}

const defaultStats: StatItemDoc[] = [
  { icon: "calendar", value: "+13 años", label: "de experiencia" },
  { icon: "factory", value: "Planta propia", label: "en Paine, Chile" },
  { icon: "users", value: "+200", label: "clientes en LATAM" },
  { icon: "boxes", value: "+150", label: "productos desarrollados" },
  { icon: "globe", value: "Presencia", label: "en LATAM y el mundo" },
];

const defaultValues: FeatureItem[] = [
  { icon: "sparkles", title: "Innovación", description: "Buscamos nuevas formas de resolver desafíos con soluciones eficientes y sostenibles." },
  { icon: "shield", title: "Calidad", description: "Cumplimos altos estándares en cada proceso para asegurar productos confiables y duraderos." },
  { icon: "handshake", title: "Compromiso", description: "Nos involucramos con cada cliente como un verdadero socio estratégico." },
  { icon: "recycle", title: "Sostenibilidad", description: "Promovemos el uso responsable de materiales y procesos que cuidan el entorno." },
  { icon: "thumbs-up", title: "Confianza", description: "Construimos relaciones de largo plazo basadas en la transparencia y el cumplimiento." },
];

const defaultWorkingWays: (WorkingWayItemDoc & { imageColor: string })[] = [
  { icon: "cog", title: "Tecnología de última generación", description: "Equipos de automatización que garantizan precisión y eficiencia.", imageColor: "141414" },
  { icon: "package", title: "Producción flexible", description: "Nos adaptamos a tus volúmenes y requerimientos específicos.", imageColor: "1f2937" },
  { icon: "users", title: "Equipo especializado", description: "Personas comprometidas que entienden tu industria y sus desafíos.", imageColor: "3f3f3a" },
  { icon: "shield", title: "Materiales de calidad", description: "Utilizamos materias primas seleccionadas para asegurar alto rendimiento.", imageColor: "2d5a3f" },
  { icon: "truck", title: "Logística eficiente", description: "Entregamos a tiempo, en todo Chile y LATAM.", imageColor: "1c3f5c" },
];

const defaultCertifications = ["ISO 9001:2015", "HACCP", "BRCGS", "SMETA", "100% Reciclable"];

const defaultParagraphs = [
  "KD Pack nació en 2011 con el propósito de entregar soluciones de packaging plástico que realmente respondieran a las necesidades de la industria agrícola.",
  "Con el tiempo, y escuchando nuevos desafíos, dimos vida a Konstruplast en 2019, ampliando nuestro alcance al sector de la construcción.",
  "Hoy, como KD Pack, somos un grupo sólido, con tecnología, experiencia y un equipo comprometido con diseñar y fabricar productos que hacen más eficientes y sostenibles las operaciones de nuestros clientes.",
];

export default async function NosotrosPage() {
  const doc = await getPageDoc<NosotrosPageDoc>("nosotrosPage");

  const stats = doc?.stats?.length ? doc.stats : defaultStats;
  const values = doc?.valoresItems?.length ? doc.valoresItems : defaultValues;
  const workingWays = doc?.workingWaysItems?.length
    ? doc.workingWaysItems.map((item, i) => ({
        ...item,
        imageColor: defaultWorkingWays[i % defaultWorkingWays.length].imageColor,
      }))
    : defaultWorkingWays;
  const certifications = doc?.certifications?.length
    ? doc.certifications
    : defaultCertifications;
  const paragraphs = doc?.historiaParagraphs?.length
    ? doc.historiaParagraphs
    : defaultParagraphs;

  return (
    <>
      <Hero
        variant="light"
        eyebrow={doc?.heroEyebrow || "Nosotros"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Diseñamos y producimos" },
                { text: "soluciones que" },
                { text: "impulsan a las industrias.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "En KD Pack desarrollamos y fabricamos soluciones plásticas de alto rendimiento para sectores que exigen calidad, continuidad y confianza."
        }
        primaryCta={{ label: doc?.heroCtaLabel || "Conoce nuestra historia", href: "#historia" }}
        imageAlt="Planta de producción KD Pack con máquinas de última generación"
        imageBg="141414"
        image={doc?.heroImage}
      />

      <section className="py-10 border-y border-kd-border bg-white">
        <div className="container grid grid-cols-2 sm:grid-cols-5 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <Icon name={stat.icon} className="h-6 w-6 text-kd-green" />
              <div>
                <p className="text-base font-semibold text-kd-text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-kd-text-secondary">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="historia" className="py-16 lg:py-20 scroll-mt-20">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="eyebrow font-semibold">{doc?.historiaEyebrow || "Nuestra historia"}</p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.historiaTitle || "Crecimos escuchando a las industrias."}
            </h2>
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="mt-4 first:mt-4 text-sm sm:text-base text-kd-text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src={resolveImageSrc(doc?.historiaImage, "141414", "900x680")}
              alt="Fachada de la planta KD Pack en Paine, Chile"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <FeatureRow
        eyebrow={doc?.valoresEyebrow || "Nuestros valores"}
        title={doc?.valoresTitle || "Lo que nos mueve cada día."}
        background="alt"
        layout="card"
        items={values}
      />

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="border-l-2 border-kd-green pl-4 max-w-2xl">
            <p className="eyebrow font-semibold">
              {doc?.workingWaysEyebrow || "Nuestra manera de trabajar"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.workingWaysTitle || "Tecnología y personas que marcan la diferencia."}
            </h2>
          </div>
          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workingWays.map((item) => (
              <div
                key={item.title}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl"
              >
                <Image
                  src={resolveImageSrc(item.image, item.imageColor, "400x520")}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <Icon name={item.icon} className="h-5 w-5 text-kd-green" />
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-kd-surface-alt">
        <div className="container grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="eyebrow font-semibold">
              {doc?.certificationsEyebrow || "Certificaciones"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.certificationsTitle || "Estándares que respaldan nuestra calidad."}
            </h2>
            <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-4">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="text-base font-bold uppercase tracking-wide text-kd-text-primary/80"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <div className="max-w-xs">
            <p className="text-sm text-kd-text-secondary leading-relaxed">
              {doc?.certificationsText ||
                "Trabajamos bajo estrictos estándares de calidad e inocuidad que respaldan nuestros procesos y productos."}
            </p>
            <Link
              href="/nosotros"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
            >
              Ver certificaciones
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative aspect-[16/7] w-full overflow-hidden">
        <Image
          src={resolveImageSrc(doc?.teamImage, "141414", "1600x700")}
          alt="Equipo de profesionales de KD Pack"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || "¿Tienes dudas?"}
        title={doc?.ctaTitle || "Hablemos y encontremos la solución ideal para tu operación."}
      />
    </>
  );
}
