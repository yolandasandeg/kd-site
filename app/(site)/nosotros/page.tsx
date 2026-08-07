import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Icon } from "@/components/icon-map";
import { Reveal } from "@/components/Reveal";
import { getClients, getPageDoc } from "@/sanity/lib/queries";
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

interface TimelineItemDoc {
  year: string;
  title: string;
  description?: string;
}

interface SpecItemDoc {
  label: string;
  value: string;
}

interface TestimonialItemDoc {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  photo?: SanityImageRef;
}

interface TeamMemberItemDoc {
  name: string;
  role?: string;
  photo?: SanityImageRef;
}

// Contenido oficial entregado por KD Pack (misión, visión y SGI).
const defaultMision =
  "Acompañar a nuestros clientes y asociados de manera activa y permanente en sus desafíos tecnológicos, mediante la propuesta de soluciones integrales de diseño, ingeniería y fabricación de productos plásticos inyectados, que por su naturaleza representen ventajas técnico-económicas sustantivas.";

const defaultVision =
  "Convertirnos en un aliado estratégico para nuestros clientes, asegurando su continuidad operacional y contribuyendo a la economía circular de nuestros productos, siendo líderes en la implementación de nuevas tecnologías que aporten a la fabricación de productos plásticos.";

const defaultPoliticaCalidad =
  "KD Pack S.A. establece como Política del SGI producir artículos plásticos para uso agrícola, forestal, industrial, de la construcción y acuícola, seguros e inocuos, satisfaciendo los requerimientos de nuestras partes interesadas y asegurando la productividad en las operaciones, lo que nos permite mantener el crecimiento de nuestro negocio cumpliendo los requisitos normativos, legales y reglamentarios vigentes. Para ello buscamos mejorar continuamente los procesos, a través del uso y cumplimiento de la mejora continua y eficacia del SGI, creando condiciones que aporten al desarrollo de las personas, respaldado por un equipo de colaboradores continuamente capacitados.";

const defaultObjetivosCalidad = [
  "Mejorar la calidad de los productos.",
  "Mejorar continuamente la eficacia del SGI.",
  "Lograr niveles satisfactorios de productividad.",
  "Satisfacer los requerimientos de nuestros clientes.",
  "Aportar al crecimiento y desarrollo de nuestros colaboradores.",
  "Producir productos inocuos para el mercado de exportación.",
];

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
  timelineItems?: TimelineItemDoc[];
  valoresEyebrow?: string;
  valoresTitle?: string;
  valoresItems?: FeatureItem[];
  misionTitle?: string;
  mision?: string;
  vision?: string;
  politicaCalidad?: string;
  objetivosCalidad?: string[];
  engelTitle?: string;
  engelIntro?: string;
  engelImage?: SanityImageRef;
  engelSpecs?: SpecItemDoc[];
  workingWaysEyebrow?: string;
  workingWaysTitle?: string;
  workingWaysItems?: WorkingWayItemDoc[];
  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  testimonials?: TestimonialItemDoc[];
  teamEyebrow?: string;
  teamTitle?: string;
  teamMembers?: TeamMemberItemDoc[];
  logosTitle?: string;
  certificationsEyebrow?: string;
  certificationsTitle?: string;
  certifications?: string[];
  certificationsText?: string;
  teamImage?: SanityImageRef;
  ctaEyebrow?: string;
  ctaTitle?: string;
}

const defaultStats: StatItemDoc[] = [
  { icon: "calendar", value: "+15 años", label: "de experiencia" },
  { icon: "factory", value: "+30.000 m²", label: "planta propia en Paine" },
  { icon: "boxes", value: "+4.500 ton", label: "fabricadas al año" },
  { icon: "sparkles", value: "100%", label: "líneas automatizadas" },
  { icon: "cog", value: "+X", label: "máquinas operando 24/7 (dato pendiente)" },
  { icon: "package", value: "+X", label: "productos propios (dato pendiente)" },
  { icon: "users", value: "+200", label: "clientes en LATAM" },
  { icon: "leaf", value: "100%", label: "energía renovable" },
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
  "Con el tiempo, y escuchando nuevos desafíos, ampliamos nuestro alcance al sector de la construcción.",
  "Hoy somos un grupo sólido, con tecnología, experiencia y un equipo comprometido con diseñar y fabricar productos que hacen más eficientes y sostenibles las operaciones de nuestros clientes.",
];

const defaultTimeline: TimelineItemDoc[] = [
  { year: "2011", title: "Fundación", description: "PLACEHOLDER: reemplazar con el hito real de fundación de la empresa." },
  { year: "2015", title: "Primera expansión", description: "PLACEHOLDER: reemplazar con un hito real (nueva línea de productos, nuevo mercado, etc.)." },
  { year: "2019", title: "Nueva planta / línea de construcción", description: "PLACEHOLDER: reemplazar con el hito real de esta etapa." },
  { year: "2023", title: "Certificaciones e inversión en tecnología", description: "PLACEHOLDER: reemplazar con el hito real de esta etapa." },
  { year: "2026", title: "Hoy", description: "PLACEHOLDER: describe dónde está la empresa hoy." },
];

const defaultEngelSpecs: SpecItemDoc[] = [
  { label: "Modelo", value: "PLACEHOLDER" },
  { label: "Fuerza de cierre", value: "PLACEHOLDER toneladas" },
  { label: "Año de incorporación", value: "PLACEHOLDER" },
  { label: "Capacidad de inyección", value: "PLACEHOLDER" },
  { label: "Tecnología", value: "PLACEHOLDER (ej: eléctrica / servo-hidráulica)" },
];

const defaultTestimonials: TestimonialItemDoc[] = [
  {
    quote: "PLACEHOLDER: testimonio real de un cliente sobre su experiencia trabajando con KD Pack.",
    author: "Nombre Apellido 1",
    role: "Cargo",
    company: "Empresa cliente",
  },
  {
    quote: "PLACEHOLDER: testimonio real de un cliente sobre su experiencia trabajando con KD Pack.",
    author: "Nombre Apellido 2",
    role: "Cargo",
    company: "Empresa cliente",
  },
  {
    quote: "PLACEHOLDER: testimonio real de un cliente sobre su experiencia trabajando con KD Pack.",
    author: "Nombre Apellido 3",
    role: "Cargo",
    company: "Empresa cliente",
  },
  {
    quote: "PLACEHOLDER: testimonio real de un cliente sobre su experiencia trabajando con KD Pack.",
    author: "Nombre Apellido 4",
    role: "Cargo",
    company: "Empresa cliente",
  },
];

const defaultTeam: (TeamMemberItemDoc & { imageColor: string })[] = [
  { name: "Nombre Apellido", role: "Cargo (ej: Gerente General)", imageColor: "141414" },
  { name: "Nombre Apellido", role: "Cargo", imageColor: "1f2937" },
  { name: "Nombre Apellido", role: "Cargo", imageColor: "3f3f3a" },
  { name: "Nombre Apellido", role: "Cargo", imageColor: "2d5a3f" },
];

export default async function NosotrosPage() {
  const [doc, clients] = await Promise.all([
    getPageDoc<NosotrosPageDoc>("nosotrosPage"),
    getClients(),
  ]);

  const stats = doc?.stats?.length ? doc.stats : defaultStats;
  const values = doc?.valoresItems?.length ? doc.valoresItems : defaultValues;
  const objetivosCalidad = doc?.objetivosCalidad?.length
    ? doc.objetivosCalidad
    : defaultObjetivosCalidad;
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
  const timeline = doc?.timelineItems?.length ? doc.timelineItems : defaultTimeline;
  const engelSpecs = doc?.engelSpecs?.length ? doc.engelSpecs : defaultEngelSpecs;
  const testimonials = doc?.testimonials?.length ? doc.testimonials : defaultTestimonials;
  const team = doc?.teamMembers?.length
    ? doc.teamMembers.map((member, i) => ({
        ...member,
        imageColor: defaultTeam[i % defaultTeam.length].imageColor,
      }))
    : defaultTeam;

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
        <div className="container grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div className="flex flex-col items-center text-center gap-2">
                <Icon name={stat.icon} className="h-6 w-6 text-kd-green" />
                <div>
                  <p className="text-base font-semibold text-kd-text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-kd-text-secondary">{stat.label}</p>
                </div>
              </div>
            </Reveal>
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

        <div className="container mt-14">
          <div className="relative border-l-2 border-kd-border pl-8 space-y-10 max-w-2xl">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 80} className="relative">
                <div className="absolute -left-[41px] top-0.5 h-4 w-4 rounded-full bg-kd-green border-4 border-white ring-1 ring-kd-border" />
                <p className="eyebrow font-semibold">{item.year}</p>
                <h3 className="mt-1 text-base font-semibold text-kd-text-primary">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 text-sm text-kd-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                )}
              </Reveal>
            ))}
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

      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <Reveal className="border-l-2 border-kd-green pl-4 max-w-2xl">
            <p className="eyebrow font-semibold">Compromiso</p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.misionTitle || "Misión, visión y política de calidad."}
            </h2>
          </Reveal>

          <div className="mt-9 grid lg:grid-cols-2 gap-6">
            <Reveal>
              <div className="h-full rounded-xl border border-kd-border bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-kd-text-primary">Misión</h3>
                <p className="mt-2.5 text-sm text-kd-text-secondary leading-relaxed text-justify">
                  {doc?.mision || defaultMision}
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-xl border border-kd-border bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-kd-text-primary">Visión</h3>
                <p className="mt-2.5 text-sm text-kd-text-secondary leading-relaxed text-justify">
                  {doc?.vision || defaultVision}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="mt-6 rounded-xl border border-kd-border bg-kd-surface-alt p-6 lg:p-8">
              <h3 className="text-base font-semibold text-kd-text-primary">
                Política de calidad
              </h3>
              <p className="mt-2.5 text-sm text-kd-text-secondary leading-relaxed text-justify">
                {doc?.politicaCalidad || defaultPoliticaCalidad}
              </p>

              <h3 className="mt-7 text-base font-semibold text-kd-text-primary">
                Objetivos de calidad
              </h3>
              <ol className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {objetivosCalidad.map((objetivo, i) => (
                  <li key={objetivo} className="flex gap-2.5 text-sm text-kd-text-secondary">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kd-green text-[11px] font-semibold text-white">
                      {i + 1}
                    </span>
                    {objetivo}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-kd-black">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl order-2 lg:order-1">
            <Image
              src={resolveImageSrc(doc?.engelImage, "1f2937", "900x680")}
              alt="Máquina inyectora Engel de última generación"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow font-semibold">Tecnología</p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-white">
              {doc?.engelTitle || "Nuestra máquina Engel: la más moderna de la planta."}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
              {doc?.engelIntro ||
                "PLACEHOLDER: describe aquí por qué esta máquina Engel representa lo último en tecnología de inyección, y qué ventajas le da a tu producción."}
            </p>
            <dl className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {engelSpecs.map((spec) => (
                <div key={spec.label} className="border-t border-white/15 pt-3">
                  <dt className="text-xs uppercase tracking-wide text-white/50">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

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
        <div className="container">
          <div className="border-l-2 border-kd-green pl-4 max-w-2xl">
            <p className="eyebrow font-semibold">
              {doc?.testimonialsEyebrow || "Lo que dicen de nosotros"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.testimonialsTitle || "Clientes que confían en nuestro trabajo."}
            </h2>
          </div>
          <div className="mt-9">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="border-l-2 border-kd-green pl-4 max-w-2xl">
            <p className="eyebrow font-semibold">
              {doc?.teamEyebrow || "Nuestro equipo directivo"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.teamTitle || "Las personas detrás de KD Pack."}
            </h2>
          </div>
          <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    src={resolveImageSrc(member.photo, member.imageColor, "320x320")}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-kd-text-primary">
                  {member.name}
                </p>
                <p className="text-xs text-kd-text-secondary">{member.role}</p>
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
              href="/sustentabilidad"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
            >
              Ver certificaciones
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <LogoStrip
        title={doc?.logosTitle || "Empresas que confían en nuestras soluciones"}
        clients={clients}
      />

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || "¿Tienes dudas?"}
        title={doc?.ctaTitle || "Hablemos y encontremos la solución ideal para tu operación."}
      />
    </>
  );
}
