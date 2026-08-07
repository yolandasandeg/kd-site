import {
  titlePart,
  ctaButton,
  badgeItem,
  featureItem,
  statItem,
  workingWayItem,
  industryTile,
  specItem,
  timelineItem,
  testimonialItem,
  teamMemberItem,
  productDocument,
} from "./objects";
import { product } from "./product";
import { project } from "./project";
import { client } from "./client";
import { category } from "./category";
import { industry } from "./industry";
import { konstruplastApplication } from "./konstruplastApplication";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { construccionPage } from "./construccionPage";
import { agricolaPage } from "./agricolaPage";
import { logisticaPage } from "./logisticaPage";
import { forestalPage } from "./forestalPage";
import { pescaPage } from "./pescaPage";
import { productosPage } from "./productosPage";
import { industriasPage } from "./industriasPage";
import { nosotrosPage } from "./nosotrosPage";
import { proyectosPage } from "./proyectosPage";
import { contactoPage } from "./contactoPage";
import { cotizaPage } from "./cotizaPage";
import { sustentabilidadPage } from "./sustentabilidadPage";
import { ubicacionPage } from "./ubicacionPage";

export const schemaTypes = [
  // Objetos reutilizables
  titlePart,
  ctaButton,
  badgeItem,
  featureItem,
  statItem,
  workingWayItem,
  industryTile,
  specItem,
  timelineItem,
  testimonialItem,
  teamMemberItem,
  productDocument,
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
  construccionPage,
  agricolaPage,
  logisticaPage,
  forestalPage,
  pescaPage,
  productosPage,
  industriasPage,
  nosotrosPage,
  proyectosPage,
  contactoPage,
  cotizaPage,
  sustentabilidadPage,
  ubicacionPage,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "construccionPage",
  "agricolaPage",
  "logisticaPage",
  "forestalPage",
  "pescaPage",
  "productosPage",
  "industriasPage",
  "nosotrosPage",
  "proyectosPage",
  "contactoPage",
  "cotizaPage",
  "sustentabilidadPage",
  "ubicacionPage",
]);
