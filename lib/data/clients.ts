export type Brand = "kdpack" | "konstruplast" | "both";

export interface Client {
  name: string;
  brand: Brand;
}

export const kdPackClients: Client[] = [
  { name: "Garces Fruit", brand: "kdpack" },
  { name: "Copefrut", brand: "kdpack" },
  { name: "Frusan", brand: "kdpack" },
  { name: "Agro Sinergia", brand: "kdpack" },
  { name: "Talley", brand: "kdpack" },
  { name: "Vitro Vidrios", brand: "kdpack" },
  { name: "CCU", brand: "kdpack" },
  { name: "Hortifrut", brand: "kdpack" },
  { name: "Salfa", brand: "kdpack" },
  { name: "Sigro", brand: "kdpack" },
];

export const konstruplastClients: Client[] = [
  { name: "EBCO", brand: "konstruplast" },
  { name: "Pilotes Terratest", brand: "konstruplast" },
  { name: "Constructora Almagro", brand: "konstruplast" },
  { name: "Vial y Vives", brand: "konstruplast" },
  { name: "Sigro", brand: "konstruplast" },
  { name: "Moller", brand: "konstruplast" },
];

export const allClients: Client[] = [
  ...kdPackClients,
  { name: "EBCO", brand: "konstruplast" },
  { name: "Pilotes Terratest", brand: "konstruplast" },
];
