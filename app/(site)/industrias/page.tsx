import type { Metadata } from "next";

import { Hero, type HeroTitlePart } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { getClients, getIndustries, getPageDoc } from "@/sanity/lib/queries";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Industrias | Soluciones plásticas por sector",
  description:
    "Soluciones plásticas para la industria agrícola, logística, forestal, almacenaje, pallets y pesquera. Diseñamos para cada desafío.",
  alternates: { canonical: "/industrias" },
  openGraph: {
    title: "Industrias | Soluciones plásticas por sector",
    description:
      "En KD Pack desarrollamos y fabricamos soluciones de packaging reutilizable que se adaptan a los desafíos específicos de cada industria.",
    url: "/industrias",
  },
};

interface IndustriasPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
  gridEyebrow?: string;
  gridTitle?: string;
  gridSubtitle?: string;
  benefitsEyebrow?: string;
  benefitsTitle?: string;
  benefitsItems?: FeatureItem[];
  ctaEyebrow?: string;
  ctaTitle?: string;
  logosTitle?: string;
}

export default async function IndustriasPage() {
  const [doc, industries, clients] = await Promise.all([
    getPageDoc<IndustriasPageDoc>("industriasPage"),
    getIndustries(),
    getClients(),
  ]);

  const industryItems = industries.map((i) => ({
    slug: i.slug,
    name: i.name,
    description: i.description,
    href: i.href,
    icon: i.icon,
    imageColor: i.imageColor,
    image: (i as { image?: SanityImageRef }).image,
  }));

  const kdPackClients = clients.filter(
    (c) => c.brand === "kdpack" || c.brand === "both"
  );

  return (
    <>
      <Hero
        variant="dark"
        layout="full"
        eyebrow={doc?.heroEyebrow || "Industrias"}
        titleParts={
          doc?.heroTitleParts?.length
            ? doc.heroTitleParts
            : [
                { text: "Soluciones plásticas" },
                { text: "para industrias que" },
                { text: "mueven a Chile y al mundo.", highlight: true },
              ]
        }
        subtitle={
          doc?.heroSubtitle ||
          "En KD Pack desarrollamos y fabricamos soluciones de packaging reutilizable que se adaptan a los desafíos específicos de cada industria."
        }
        primaryCta={{ label: "Cotiza tu proyecto", href: "/cotiza-tu-proyecto" }}
        secondaryCta={{
          label: "Escríbenos por WhatsApp",
          href: "https://wa.me/56228249870",
          icon: "message-circle",
        }}
        imageAlt="Forklift moviendo bins plásticos en planta industrial KD Pack"
        imageBg="1f2937"
        image={doc?.heroImage}
        overlayOpacity={doc?.heroOverlayOpacity}
      />

      <CategoryGrid
        eyebrow={doc?.gridEyebrow || "Industrias que impulsamos"}
        title={doc?.gridTitle || "Diseñamos soluciones para cada desafío."}
        subtitle={
          doc?.gridSubtitle ||
          "Nuestra experiencia y tecnología nos permiten ofrecer productos que mejoran la eficiencia, protegen los productos y cuidan el medio ambiente."
        }
        items={industryItems}
        variant="detailed"
      />

      <FeatureRow
        eyebrow={doc?.benefitsEyebrow || "Por qué elegir nuestras soluciones"}
        title={doc?.benefitsTitle || "Beneficios que generan impacto real en tu operación."}
        background="dark"
        items={
          doc?.benefitsItems?.length
            ? doc.benefitsItems
            : [
                { icon: "shield", title: "Durabilidad y resistencia", description: "Productos de alta calidad que garantizan una larga vida útil." },
                { icon: "recycle", title: "Sostenibilidad", description: "Materiales reciclables y reutilizables que cuidan el planeta." },
                { icon: "clock", title: "Eficiencia y ahorro", description: "Optimización de procesos y reducción de costos operacionales." },
                { icon: "sparkles", title: "Higiene y seguridad", description: "Fáciles de limpiar y diseñados para cumplir los más altos estándares." },
                { icon: "thumbs-up", title: "Asesoría especializada", description: "Acompañamiento experto para encontrar la solución ideal para tu industria." },
              ]
        }
      />

      <LogoStrip
        title={doc?.logosTitle || "Empresas que confían en nuestras soluciones"}
        clients={kdPackClients}
      />

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || "¿Tienes un proyecto en mente?"}
        title={
          doc?.ctaTitle ||
          "Hablemos de cómo podemos impulsar tu industria con soluciones plásticas inteligentes y sostenibles."
        }
      />
    </>
  );
}
