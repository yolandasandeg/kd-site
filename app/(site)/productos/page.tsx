import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsExplorer } from "./ProductsExplorer";
import { FeatureRow, type FeatureItem } from "@/components/sections/FeatureRow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getPageDoc, getProducts } from "@/sanity/lib/queries";
import type { HeroTitlePart } from "@/components/sections/Hero";
import type { SanityImageRef } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Productos | Catálogo de packaging y soluciones plásticas",
  description:
    "Explora más de 150 productos: bins, cajas cosecheras, pallets, contenedores y soluciones para construcción. Filtra por categoría, característica y material.",
  alternates: { canonical: "/productos" },
  openGraph: {
    title: "Productos | Catálogo de packaging y soluciones plásticas",
    description:
      "Explora más de 150 productos: bins, cajas cosecheras, pallets, contenedores y soluciones para construcción.",
    url: "/productos",
  },
};

interface ProductosPageDoc {
  heroEyebrow?: string;
  heroTitleParts?: HeroTitlePart[];
  heroSubtitle?: string;
  searchPlaceholder?: string;
  heroImage?: SanityImageRef;
  heroOverlayOpacity?: number;
  bottomItems?: FeatureItem[];
  ctaEyebrow?: string;
  ctaTitle?: string;
}

export default async function ProductosPage() {
  const [doc, products] = await Promise.all([
    getPageDoc<ProductosPageDoc>("productosPage"),
    getProducts(),
  ]);

  return (
    <>
      <Suspense fallback={null}>
        <ProductsExplorer
          products={products}
          heroEyebrow={doc?.heroEyebrow}
          heroTitleParts={doc?.heroTitleParts?.length ? doc.heroTitleParts : undefined}
          heroSubtitle={doc?.heroSubtitle}
          searchPlaceholder={doc?.searchPlaceholder}
          heroImage={doc?.heroImage}
          heroOverlayOpacity={doc?.heroOverlayOpacity}
        />
      </Suspense>

      <FeatureRow
        background="alt"
        items={
          doc?.bottomItems?.length
            ? doc.bottomItems
            : [
                { icon: "globe", title: "Fabricación nacional", description: "Planta propia en Paine, Chile." },
                { icon: "clock", title: "Material reciclable", description: "Comprometidos con el medio ambiente." },
                { icon: "truck", title: "Entrega rápida", description: "Cobertura en todo Chile y LATAM." },
                { icon: "users", title: "Asesoría experta", description: "Te ayudamos a elegir la mejor solución." },
              ]
        }
      />

      <CtaBanner
        eyebrow={doc?.ctaEyebrow || "¿No encuentras lo que necesitas?"}
        title={doc?.ctaTitle || "Desarrollamos soluciones a medida para tu operación."}
      />
    </>
  );
}
