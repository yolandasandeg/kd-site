import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Globe2, Navigation } from "lucide-react";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { getContactInfo, getPageDoc } from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Contacto | Hablemos de tu próximo proyecto",
  description:
    "Contáctanos por WhatsApp, correo o formulario. Planta propia en Paine, Región Metropolitana, con cobertura en todo Chile y LATAM.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Hablemos de tu próximo proyecto",
    description:
      "Cuéntanos qué necesitas y nuestro equipo te responderá a la brevedad con la mejor solución para tu operación.",
    url: "/contacto",
  },
};

interface ContactoPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
  locationEyebrow?: string;
  locationTitle?: string;
  locationText?: string;
}

export default async function ContactoPage() {
  const [doc, contact] = await Promise.all([
    getPageDoc<ContactoPageDoc>("contactoPage"),
    getContactInfo(),
  ]);

  const contactDetails = [
    { icon: MapPin, label: "Dirección", value: contact.address },
    { icon: Phone, label: "Teléfono", value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: "Correo", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: "Horario de atención", value: contact.hours },
    { icon: Globe2, label: "Cobertura", value: contact.coverage },
  ];

  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        eyebrow={doc?.heroEyebrow || "Contacto"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Hablemos de tu" },
                { text: "próximo proyecto.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Cuéntanos qué necesitas y nuestro equipo te responderá a la brevedad con la mejor solución para tu operación."
        }
        primaryCta={{
          label: "Escríbenos por WhatsApp",
          href: contact.whatsappHref,
          icon: "message-circle",
        }}
        secondaryCta={{
          label: "Envíanos un correo",
          href: `mailto:${contact.email}`,
          icon: "mail",
        }}
        imageAlt="Bin plástico KD Pack en bodega industrial"
        imageBg="141414"
        image={doc?.heroImage}
        overlayOpacity={doc?.heroOverlayOpacity}
      />

      <section className="py-14 lg:py-16">
        <div className="container grid lg:grid-cols-[320px_1fr] gap-10">
          <div>
            <h2 className="text-lg font-semibold text-kd-text-primary">
              Información de contacto
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
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-kd-surface-alt">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow font-semibold">{doc?.locationEyebrow || "Nuestra ubicación"}</p>
            <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-kd-text-primary">
              {doc?.locationTitle || "Planta propia en Paine, Región Metropolitana."}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-kd-text-secondary leading-relaxed">
              {doc?.locationText ||
                "Contamos con instalaciones propias equipadas con tecnología de última generación para asegurar calidad, capacidad y continuidad."}
            </p>
            <Button asChild variant="outline" className="mt-5">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </a>
            </Button>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-kd-border">
            <iframe
              src={contact.mapEmbedSrc}
              title="Mapa de ubicación de KD Plus en Paine, Chile"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
