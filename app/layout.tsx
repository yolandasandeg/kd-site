import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getContactInfo, getSiteBranding } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import type { Image as SanityImage } from "sanity";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { favicon } = await getSiteBranding();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | Packaging plástico industrial`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "KD Pack fabrica packaging plástico industrial y soluciones plásticas para agricultura, acuicultura, forestal, construcción y logística, en Chile con presencia en LATAM.",
    openGraph: {
      type: "website",
      locale: "es_CL",
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Packaging plástico industrial`,
      description:
        "Packaging plástico industrial y soluciones plásticas para agricultura, acuicultura, forestal, construcción y logística, fabricadas en Chile con presencia en LATAM.",
    },
    icons: favicon?.asset?._ref
      ? { icon: urlFor(favicon as SanityImage).width(64).height(64).url() }
      : undefined,
    // Se completa con el código que entrega Google Search Console al verificar
    // el dominio (variable de entorno en Vercel).
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: { canonical: "/" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = draftMode();
  const [contact, branding] = await Promise.all([
    getContactInfo(),
    getSiteBranding(),
  ]);

  const logoUrl = branding.logo?.asset?._ref
    ? urlFor(branding.logo as SanityImage).width(512).url()
    : undefined;

  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd
          data={organizationSchema({
            email: contact.email,
            phone: contact.phone,
            address: contact.address,
            linkedinUrl: contact.linkedinUrl,
            logoUrl,
          })}
        />
        <JsonLd data={websiteSchema()} />
        {children}
        {isDraftMode && <VisualEditing />}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
