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
  { name: "EBCO", brand: "kdpack" },
  { name: "Pilotes Terratest", brand: "kdpack" },
  { name: "Constructora Almagro", brand: "kdpack" },
  { name: "Vial y Vives", brand: "kdpack" },
  { name: "Moller", brand: "kdpack" },
];

export const allClients: Client[] = [...kdPackClients];
