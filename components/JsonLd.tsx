import { SITE_NAME, SITE_URL } from "@/lib/constants";

/**
 * Datos estructurados schema.org. Los leen Google (para las fichas ricas en
 * resultados de búsqueda) y los motores generativos tipo ChatGPT/Perplexity
 * para entender de qué se trata la empresa y sus productos.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es generado por nosotros, no viene del usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface OrganizationOptions {
  email?: string;
  phone?: string;
  address?: string;
  linkedinUrl?: string;
  logoUrl?: string;
}

export function organizationSchema({
  email,
  phone,
  address,
  linkedinUrl,
  logoUrl,
}: OrganizationOptions = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "KD Pack S.A.",
    url: SITE_URL,
    ...(logoUrl ? { logo: logoUrl } : {}),
    description:
      "Fabricante chileno de soluciones plásticas inyectadas: cajas, bins, pallets y contenedores reutilizables para las industrias agrícola, construcción, logística, forestal y pesca.",
    foundingDate: "2010",
    areaServed: [
      { "@type": "Country", name: "Chile" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    knowsAbout: [
      "Packaging plástico industrial",
      "Cajas cosecheras",
      "Cajas de exportación",
      "Bins y contenedores plásticos",
      "Pallets plásticos",
      "Encofrados plásticos",
      "Economía circular",
    ],
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address,
            addressLocality: "Paine",
            addressRegion: "Región Metropolitana",
            addressCountry: "CL",
          },
        }
      : {}),
    ...(email || phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            ...(email ? { email } : {}),
            ...(phone ? { telephone: phone } : {}),
            availableLanguage: ["Spanish"],
            areaServed: "CL",
          },
        }
      : {}),
    ...(linkedinUrl ? { sameAs: [linkedinUrl] } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "es-CL",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

interface ProductSchemaInput {
  slug: string;
  name: string;
  code?: string;
  description?: string;
  material?: string;
  size?: string;
  category?: string;
  imageUrl?: string;
}

export function productSchema(product: ProductSchemaInput) {
  const properties = [
    product.size ? { "@type": "PropertyValue", name: "Dimensiones", value: product.size } : null,
    product.material ? { "@type": "PropertyValue", name: "Material", value: product.material } : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/productos/${product.slug}#product`,
    name: product.name,
    ...(product.code ? { sku: product.code, mpn: product.code } : {}),
    ...(product.description ? { description: product.description } : {}),
    ...(product.imageUrl ? { image: product.imageUrl } : {}),
    ...(product.category ? { category: product.category } : {}),
    ...(product.material ? { material: product.material } : {}),
    url: `${SITE_URL}/productos/${product.slug}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    ...(properties.length ? { additionalProperty: properties } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
