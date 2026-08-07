export interface ProductsMenuLink {
  label: string;
  href: string;
}

export interface ProductsMenuIndustry extends ProductsMenuLink {
  subcategories?: ProductsMenuLink[];
}

export const PRODUCTS_MENU: ProductsMenuIndustry[] = [
  {
    label: "Agrícola",
    href: "/productos?categoria=agricola",
    subcategories: [
      { label: "Cajas expo", href: "/productos?categoria=cajas-expo" },
      { label: "Cajas cosecheras", href: "/productos?categoria=cajas-cosecheras" },
      { label: "Otros", href: "/productos?categoria=agricola" },
    ],
  },
  { label: "Construcción", href: "/productos?industria=Construcci%C3%B3n" },
  { label: "Logística", href: "/productos?categoria=almacenaje" },
  { label: "Forestal", href: "/productos?categoria=forestal" },
  { label: "Pesca", href: "/productos?categoria=pesca" },
];
