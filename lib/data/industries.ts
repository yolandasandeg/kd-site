export interface Industry {
  slug: string;
  name: string;
  description: string;
  href: string;
  icon: "leaf" | "truck" | "trees" | "warehouse" | "layers" | "fish";
  imageColor: string;
}

export const industries: Industry[] = [
  {
    slug: "agricola",
    name: "Agrícola",
    description:
      "Soluciones diseñadas para la cosecha, transporte y almacenamiento de frutas, hortalizas y otros productos agrícolas.",
    href: "/productos?categoria=agricola",
    icon: "leaf",
    imageColor: "2d5a3f",
  },
  {
    slug: "almacenaje",
    name: "Almacenaje Industrial",
    description:
      "Contenedores y bins de alta resistencia para el almacenamiento seguro y organizado en la industria.",
    href: "/productos?categoria=almacenaje",
    icon: "warehouse",
    imageColor: "141414",
  },
  {
    slug: "forestal",
    name: "Forestal",
    description:
      "Productos resistentes para viveros, transporte de plantas y operaciones forestales en condiciones exigentes.",
    href: "/productos?categoria=forestal",
    icon: "trees",
    imageColor: "3d5c3a",
  },
  {
    slug: "logistica",
    name: "Logística y Distribución",
    description:
      "Optimización de procesos logísticos con contenedores y pallets reutilizables que mejoran la eficiencia y reducen costos.",
    href: "/productos?categoria=pallets",
    icon: "truck",
    imageColor: "1f2937",
  },
  {
    slug: "pallets",
    name: "Pallets y Bases",
    description:
      "Pallets plásticos reutilizables, higiénicos y de larga vida útil para todo tipo de operaciones industriales.",
    href: "/productos?categoria=pallets",
    icon: "layers",
    imageColor: "3f3f3a",
  },
  {
    slug: "pesquera",
    name: "Pesquera",
    description:
      "Cajas y contenedores plásticos diseñados para la industria pesquera, resistentes a la humedad y fáciles de limpiar.",
    href: "/productos?categoria=pesca",
    icon: "fish",
    imageColor: "1c3f5c",
  },
];
