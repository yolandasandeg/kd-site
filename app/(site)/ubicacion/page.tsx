import type { Metadata } from "next";
import { MapPin, Phone, Clock, Globe2, Navigation } from "lucide-react";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/button";
import { getContactInfo, getPageDoc } from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Ubicación | Planta KD Pack en Paine, Chile",
  description:
    "Planta propia en Paine, Región Metropolitana, con cobertura de despacho en todo Chile y LATAM.",
  alternates: { canonical: "/ubicacion" },
  openGraph: {
    title: "Ubicación | Planta KD Pack en Paine, Chile",
    description:
      "Planta propia en Paine, Región Metropolitana, con cobertura de despacho en todo Chile y LATAM.",
    url: "/ubicacion",
  },
};

interface UbicacionPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
  locationEyebrow?: string;
  locationTitle?: string;
  locationText?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
}

export default async function UbicacionPage() {
  const [doc, contact] = await Promise.all([
    getPageDoc<UbicacionPageDoc>("ubicacionPage"),
    getContactInfo(),
  ]);

  const contactDetails = [
    { icon: MapPin, label: "Dirección", value: contact.address },
    { icon: Phone, label: "Teléfono", value: contact.phone, href: contact.phoneHref },
    { icon: Clock, label: "Horario de atención", value: contact.hours },
    { icon: Globe2, label: "Cobertura", value: contact.coverage },
  ];

  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        eyebrow={doc?.heroEyebrow || "Ubicación"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Planta propia en" },
                { text: "Paine, Región Metropolitana.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Instalaciones propias equipadas con tecnología de última generación, con cobertura de despacho en todo Chile y LATAM."
        }
        primaryCta={{
          label: "Escríbenos por WhatsApp",
          href: contact.whatsappHref,
          icon: "message-circle",
        }}
        imageAlt="Fachada de la planta KD Pack en Paine, Chile"
        imageBg="141414"
        image={doc?.heroImage}
        overlayOpacity={doc?.heroOverlayOpacity}
      />

      <section className="py-14 lg:py-16">
        <div className="container grid lg:grid-cols-[320px_1fr] gap-10">
          <div>
            <h2 className="text-lg font-semibold text-kd-text-primary">
              Información de ubicación
            </h2>
            <ul className="mt-5 space-y-5">
              {contactDetails.map((detail) => (
                <li key={detail.label} className="flex items-start gap-3">
                  <detail.icon className="h-5 w-5 text-kd-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-kd-text-primary">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-sm text-kd-text-secondary hover:text-kd-green"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-sm text-kd-text-secondary">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Camino+Padre+Hurtado+16301+Paine+Chile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </a>
            </Button>
          </div>

          <div className="aspect-[16/10] lg:aspect-auto w-full overflow-hidden rounded-2xl border border-kd-border">
            <iframe
              src={contact.mapEmbedSrc}
              title="Mapa de ubicación de KD Pack en Paine, Chile"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-kd-surface-alt">
        <div className="container">
          <p className="eyebrow font-semibold">{doc?.locationEyebrow || "Nuestra ubicación"}</p>
          <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary max-w-xl">
            {doc?.locationTitle || "Fabricación nacional, cobertura en todo Chile y LATAM."}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-kd-text-secondary leading-relaxed max-w-xl">
            {doc?.locationText ||
              "Desde nuestra planta en Paine despachamos a todo el país y exportamos a distintos mercados de Latinoamérica, con procesos logísticos pensados para no detener tu operación."}
          </p>
        </div>
      </section>

      <CtaBanner
        eyebrow={doc?.ctaEyebrow}
        title={doc?.ctaTitle}
      />
    </>
  );
}
