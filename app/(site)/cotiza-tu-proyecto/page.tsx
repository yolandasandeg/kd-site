import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Globe2 } from "lucide-react";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/button";
import { getContactInfo, getPageDoc } from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Cotiza tu proyecto | Te ayudamos a encontrar la mejor solución",
  description:
    "Completa el formulario con los detalles de tu proyecto y nuestro equipo se pondrá en contacto contigo a la brevedad para asesorarte.",
  alternates: { canonical: "/cotiza-tu-proyecto" },
  openGraph: {
    title: "Cotiza tu proyecto | KD Plus",
    description:
      "Cuéntanos tu proyecto, te ayudamos a encontrar la mejor solución.",
    url: "/cotiza-tu-proyecto",
  },
};

interface CotizaPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroImage?: SanityImageRef;
  sidebarBoxTitle?: string;
  sidebarBoxText?: string;
  whyEyebrow?: string;
  whyItems?: FeatureItem[];
  ctaEyebrow?: string;
  ctaTitle?: string;
}

export default async function CotizaTuProyectoPage() {
  const [doc, contact] = await Promise.all([
    getPageDoc<CotizaPageDoc>("cotizaPage"),
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
        eyebrow={doc?.heroEyebrow || "Cotiza tu proyecto"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Cuéntanos tu proyecto," },
                { text: "te ayudamos a" },
                { text: "encontrar la mejor solución.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad para asesorarte."
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
        imageAlt="Bin plástico KD Pack listo para despacho"
        imageBg="141414"
        image={doc?.heroImage}
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

            <div className="mt-8 rounded-xl bg-kd-surface-alt p-5">
              <p className="text-sm font-semibold text-kd-text-primary">
                {doc?.sidebarBoxTitle || "¿Prefieres hablar con nosotros?"}
              </p>
              <p className="mt-1.5 text-sm text-kd-text-secondary">
                {doc?.sidebarBoxText ||
                  "Nuestro equipo está listo para resolver tus dudas y guiarte."}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                  Escríbenos por WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>

      <FeatureRow
        eyebrow={doc?.whyEyebrow || "¿Por qué cotizar con KD Pack?"}
        background="alt"
        items={
          doc?.whyItems?.length
            ? doc.whyItems
            : [
                { icon: "users", title: "Asesoría experta", description: "Te ayudamos a elegir la solución que mejor se adapta a tu operación." },
                { icon: "award", title: "Productos de calidad", description: "Fabricados con materiales de alto estándar y gran resistencia." },
                { icon: "wrench", title: "Soluciones a medida", description: "Diseñamos y fabricamos productos para necesidades específicas." },
                { icon: "truck", title: "Entrega rápida", description: "Cobertura en todo Chile y LATAM con logística eficiente." },
                { icon: "recycle", title: "Sostenibilidad", description: "Productos reciclables y procesos que cuidan el medio ambiente." },
              ]
        }
      />

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || "¿Tienes dudas?"}
        title={doc?.ctaTitle || "Hablemos y encontremos la mejor solución para tu operación."}
      />
    </>
  );
}
