import { titlePart, ctaButton, badgeItem, featureItem, statItem, workingWayItem } from "./objects";
import { product } from "./product";
import { project } from "./project";
import { client } from "./client";
import { category } from "./category";
import { industry } from "./industry";
import { konstruplastApplication } from "./konstruplastApplication";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { konstruplastPage } from "./konstruplastPage";
import { productosPage } from "./productosPage";
import { industriasPage } from "./industriasPage";
import { nosotrosPage } from "./nosotrosPage";
import { proyectosPage } from "./proyectosPage";
import { contactoPage } from "./contactoPage";
import { cotizaPage } from "./cotizaPage";

export const schemaTypes = [
  // Objetos reutilizables
  titlePart,
  ctaButton,
  badgeItem,
  featureItem,
  statItem,
  workingWayItem,
  // Colecciones
  product,
  project,
  client,
  category,
  industry,
  konstruplastApplication,
  // Configuración
  siteSettings,
  // Páginas (singletons)
  homePage,
  konstruplastPage,
  productosPage,
  industriasPage,
  nosotrosPage,
  proyectosPage,
  contactoPage,
  cotizaPage,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "konstruplastPage",
  "productosPage",
  "industriasPage",
  "nosotrosPage",
  "proyectosPage",
  "contactoPage",
  "cotizaPage",
]);
