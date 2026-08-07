export interface Industry {
  slug: string;
  name: string;
  description: string;
  /** Página propia de la industria ("Ver más"). */
  href: string;
  /** Catálogo filtrado por esta industria ("Ver productos"). */
  productsHref: string;
  icon: "leaf" | "building-2" | "truck" | "trees" | "fish";
  imageColor: string;
}

// Las 5 industrias oficiales de KD Pack. Deben coincidir con `industries`
// en lib/data/products.ts (filtro de /productos) y con PRODUCTS_MENU.
export const industries: Industry[] = [
  {
    slug: "agricola",
    name: "Agrícola",
    description:
      "Soluciones diseñadas para la cosecha, transporte y almacenamiento de frutas, hortalizas y otros productos agrícolas.",
    href: "/industrias/agricola",
    productsHref: "/productos?industria=Agr%C3%ADcola",
    icon: "leaf",
    imageColor: "2d5a3f",
  },
  {
    slug: "construccion",
    name: "Construcción",
    description:
      "Encofrados, separadores, tapas de seguridad y alivianantes plásticos para obras más eficientes y seguras.",
    href: "/industrias/construccion",
    productsHref: "/productos?industria=Construcci%C3%B3n",
    icon: "building-2",
    imageColor: "3f3f3a",
  },
  {
    slug: "logistica",
    name: "Logística",
    description:
      "Bins, contenedores y pallets reutilizables que optimizan el almacenaje, la distribución y el manejo de carga.",
    href: "/industrias/logistica",
    productsHref: "/productos?industria=Log%C3%ADstica",
    icon: "truck",
    imageColor: "1f2937",
  },
  {
    slug: "forestal",
    name: "Forestal",
    description:
      "Productos resistentes para viveros, transporte de plantas y operaciones forestales en condiciones exigentes.",
    href: "/industrias/forestal",
    productsHref: "/productos?industria=Forestal",
    icon: "trees",
    imageColor: "3d5c3a",
  },
  {
    slug: "pesca",
    name: "Pesca",
    description:
      "Cajas y contenedores plásticos diseñados para la industria pesquera y acuícola, resistentes a la humedad y fáciles de limpiar.",
    href: "/industrias/pesca",
    productsHref: "/productos?industria=Pesca",
    icon: "fish",
    imageColor: "1c3f5c",
  },
];
