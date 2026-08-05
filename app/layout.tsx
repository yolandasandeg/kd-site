import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import "./globals.css";

import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getSiteBranding } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = draftMode();

  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
