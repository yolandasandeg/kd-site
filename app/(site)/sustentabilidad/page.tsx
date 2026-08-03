import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { SealsStrip, type SealItem } from "@/components/sections/SealsStrip";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getSustentabilidadPage } from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

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
  certificateTitle?: string;
  certificateIssuer?: string;
  certificateFacts?: string[];
  certificateFile?: { asset?: { url?: string; originalFilename?: string } };
  ctaEyebrow?: string;
  ctaTitle?: string;
}

export default async function SustentabilidadPage() {
  const doc = await getSustentabilidadPage<SustentabilidadPageDoc>();

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
                  { icon: "leaf", label: "RENOVA - Energía renovable" },
                  { icon: "shield", label: "ISO 9001" },
                  { icon: "building", label: "SERVIU" },
                  { icon: "award", label: "DICTUC" },
                  { icon: "recycle", label: "Materia prima reciclada" },
                ]
          }
        />
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
