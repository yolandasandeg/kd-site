import type { Metadata } from "next";
import Image from "next/image";
import { FileText } from "lucide-react";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { SealsStrip, type SealItem } from "@/components/sections/SealsStrip";
import { Icon } from "@/components/icon-map";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getSustentabilidadPage } from "@/sanity/lib/queries";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Sustentabilidad | Compromiso ambiental de KD Pack",
  description:
    "Energía 100% renovable certificada, materiales reciclables y procesos validados por certificaciones técnicas independientes.",
  alternates: { canonical: "/sustentabilidad" },
  openGraph: {
    title: "Sustentabilidad | Compromiso ambiental de KD Pack",
    description:
      "Energía 100% renovable certificada, materiales reciclables y procesos validados por certificaciones técnicas independientes.",
    url: "/sustentabilidad",
  },
};

interface StatItemDoc {
  icon: string;
  value: string;
  label: string;
}

interface SustentabilidadPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
  pillarsEyebrow?: string;
  pillarsTitle?: string;
  pillarsItems?: FeatureItem[];
  sealsTitle?: string;
  seals?: SealItem[];
  impactEyebrow?: string;
  impactTitle?: string;
  impactStats?: StatItemDoc[];
  recyclingEyebrow?: string;
  recyclingTitle?: string;
  recyclingText?: string;
  recyclingPartner?: string;
  recyclingImages?: SanityImageRef[];
  certificateTitle?: string;
  certificateIssuer?: string;
  certificateFacts?: string[];
  certificateFile?: { asset?: { url?: string; originalFilename?: string } };
  ctaEyebrow?: string;
  ctaTitle?: string;
}

const defaultImpactStats: StatItemDoc[] = [
  { icon: "recycle", value: "+X%", label: "de productos con material reciclado (dato pendiente)" },
  { icon: "leaf", value: "+X%", label: "de productos 100% reciclables (dato pendiente)" },
];

export default async function SustentabilidadPage() {
  const doc = await getSustentabilidadPage<SustentabilidadPageDoc>();
  const impactStats = doc?.impactStats?.length ? doc.impactStats : defaultImpactStats;

  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        eyebrow={doc?.heroEyebrow || "Sustentabilidad"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Fabricamos pensando en" },
                { text: "el futuro de la industria.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Energía 100% renovable certificada, materiales reciclables y procesos validados por certificaciones técnicas independientes."
        }
        primaryCta={{ label: "Cotiza tu proyecto", href: "/cotiza-tu-proyecto" }}
        imageAlt="Planta industrial KD Pack con energía renovable"
        imageBg="1f2937"
        image={doc?.heroImage}
        overlayOpacity={doc?.heroOverlayOpacity}
      />

      <section className="py-16 lg:py-20">
        <FeatureRow
          eyebrow={doc?.pillarsEyebrow || "Nuestros pilares"}
          title={
            doc?.pillarsTitle ||
            "Un compromiso concreto, no solo una declaración."
          }
          background="white"
          layout="card"
          items={
            doc?.pillarsItems?.length
              ? doc.pillarsItems
              : [
                  {
                    icon: "leaf",
                    title: "100% energía renovable",
                    description:
                      "Toda nuestra planta opera con energía eléctrica 100% renovable, certificada año a año por el Coordinador Eléctrico Nacional.",
                  },
                  {
                    icon: "recycle",
                    title: "Materia prima reciclada",
                    description:
                      "Incorporamos materiales reciclables y reciclados en nuestros procesos, reduciendo el impacto ambiental de cada producto.",
                  },
                  {
                    icon: "shield",
                    title: "ISO 9001",
                    description:
                      "Certificación de calidad en toda la cadena productiva, que asegura procesos consistentes y responsables.",
                  },
                  {
                    icon: "sparkles",
                    title: "Innovación validada",
                    description:
                      "Mejoramos continuamente diseños y procesos, respaldados por certificaciones técnicas independientes como DICTUC.",
                  },
                ]
          }
        />

        <SealsStrip
          title={doc?.sealsTitle}
          items={
            doc?.seals?.length
              ? doc.seals
              : [
                  {
                    icon: "leaf",
                    label: "RENOVA - Energía renovable",
                    description: "Certificado del Coordinador Eléctrico Nacional que acredita que nuestra planta consume energía eléctrica 100% renovable.",
                  },
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
                    icon: "recycle",
                    label: "Materia prima reciclada",
                    description: "Incorporamos materiales reciclables y reciclados en nuestros procesos, reduciendo el impacto ambiental de cada producto.",
                  },
                ]
          }
        />
      </section>

      <section className="py-16 lg:py-20 bg-kd-black">
        <div className="container">
          <div className="border-l-2 border-kd-green pl-4 max-w-2xl">
            <p className="eyebrow font-semibold">
              {doc?.impactEyebrow || "Impacto en números"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-white">
              {doc?.impactTitle || "Sostenibilidad medible, no solo declarada."}
            </h2>
          </div>
          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 p-6"
              >
                <Icon name={stat.icon} className="h-8 w-8 text-kd-green shrink-0" />
                <div>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="border-l-2 border-kd-green pl-4 max-w-2xl">
            <p className="eyebrow font-semibold">
              {doc?.recyclingEyebrow || "Materia prima reciclada"}
            </p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.recyclingTitle || "De vuelta al ciclo productivo."}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-kd-text-secondary leading-relaxed">
              {doc?.recyclingText ||
                `Trabajamos junto a ${doc?.recyclingPartner || "CE Maipo"} para dar una segunda vida a materiales plásticos, incorporándolos de vuelta a nuestros procesos productivos.`}
            </p>
          </div>
          <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(doc?.recyclingImages?.length
              ? doc.recyclingImages
              : [undefined, undefined, undefined, undefined]
            ).map((image, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={resolveImageSrc(image, "2d5a3f", "400x400")}
                  alt="Uso de materia prima reciclada en KD Pack"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, 45vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-kd-surface-alt">
        <div className="container grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="eyebrow font-semibold">Certificado 2025</p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.certificateTitle ||
                "Certificado de Energía Renovable RENOVA"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-kd-text-secondary leading-relaxed max-w-xl">
              {doc?.certificateIssuer ||
                "El Coordinador Eléctrico Nacional acredita, a través del Registro Nacional de Energías Renovables (RENOVA), que durante 2025 KD Pack SA consumió energía eléctrica 100% renovable."}
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-xl">
              {(doc?.certificateFacts?.length
                ? doc.certificateFacts
                : [
                    "Energía renovable certificada: 100%",
                    "Factor de emisión: 0 tCO₂e / MWh",
                    "Periodo: Enero 2025 - Diciembre 2025",
                    "Suministrador: EMOAC SpA",
                  ]
              ).map((fact) => (
                <li
                  key={fact}
                  className="text-sm text-kd-text-primary font-medium"
                >
                  {fact}
                </li>
              ))}
            </ul>
            {doc?.certificateFile?.asset?.url && (
              <a
                href={doc.certificateFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-kd-green hover:text-kd-green-dark"
              >
                <FileText className="h-4 w-4" />
                Ver certificado
              </a>
            )}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || "¿Tienes un proyecto en mente?"}
        title={
          doc?.ctaTitle ||
          "Hablemos de cómo podemos impulsar tu operación con soluciones sostenibles."
        }
      />
    </>
  );
}
