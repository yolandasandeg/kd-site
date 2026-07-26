import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import "./globals.css";

import { SITE_NAME, SITE_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | KD Pack & Konstruplast`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "KD Plus es el holding que agrupa a KD Pack y Konstruplast: packaging plástico industrial y soluciones plásticas para construcción, fabricadas en Chile con presencia en LATAM.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | KD Pack & Konstruplast`,
    description:
      "Packaging plástico industrial y soluciones plásticas para construcción, fabricadas en Chile con presencia en LATAM.",
  },
};

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
