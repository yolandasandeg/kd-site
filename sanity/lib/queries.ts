import { sanityFetch } from "./client";
import type { SanityImageRef } from "./image";
import {
  products as staticProducts,
  type Product,
} from "@/lib/data/products";
import { projects as staticProjects, type Project } from "@/lib/data/projects";
import {
  kdPackClients,
  konstruplastClients,
  type Client,
} from "@/lib/data/clients";
import {
  solutionCategories,
  type SolutionCategory,
} from "@/lib/data/categories";
import { industries as staticIndustries, type Industry } from "@/lib/data/industries";
import {
  konstruplastApplications as staticApplications,
  type KonstruplastApplication,
} from "@/lib/data/konstruplast";

const PRODUCT_PROJECTION = `{
  "slug": slug.current,
  name, code, size, material, category, brand, description, productType, features, image
}`;

export async function getProducts(): Promise<
  (Product & { image?: SanityImageRef })[]
> {
  return sanityFetch(
    `*[_type == "product"] | order(order asc) ${PRODUCT_PROJECTION}`,
    {},
    staticProducts
  );
}

const PROJECT_PROJECTION = `{
  "slug": slug.current,
  title, brand, industry, client, description, image, featuredOnHome
}`;

export async function getProjects(): Promise<
  (Project & { image?: SanityImageRef; featuredOnHome?: boolean })[]
> {
  return sanityFetch(
    `*[_type == "project"] | order(order asc) ${PROJECT_PROJECTION}`,
    {},
    staticProjects
  );
}

export async function getClients(): Promise<
  (Client & { logo?: SanityImageRef })[]
> {
  return sanityFetch(
    `*[_type == "client"] | order(order asc) { name, brand, logo }`,
    {},
    [...kdPackClients, ...konstruplastClients]
  );
}

export async function getCategories(): Promise<
  (SolutionCategory & { image?: SanityImageRef })[]
> {
  return sanityFetch(
    `*[_type == "category"] | order(order asc) { name, "slug": slug.current, href, icon, image }`,
    {},
    solutionCategories
  );
}

export async function getIndustries(): Promise<
  (Industry & { image?: SanityImageRef })[]
> {
  return sanityFetch(
    `*[_type == "industry"] | order(order asc) { name, "slug": slug.current, description, href, icon, image }`,
    {},
    staticIndustries
  );
}

export async function getKonstruplastApplications(): Promise<
  KonstruplastApplication[]
> {
  return sanityFetch(
    `*[_type == "konstruplastApplication"] | order(order asc) { name, "slug": slug.current, description, icon }`,
    {},
    staticApplications
  );
}

interface SiteSettingsDoc {
  address?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  hours?: string;
  coverage?: string;
  mapEmbedSrc?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

export async function getSiteSettings(): Promise<SiteSettingsDoc | null> {
  return sanityFetch(`*[_type == "siteSettings"][0]`, {}, null);
}

export interface ContactInfo {
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;
  coverage: string;
  mapEmbedSrc: string;
  whatsappHref: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export async function getContactInfo(): Promise<ContactInfo> {
  const { CONTACT, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } = await import(
    "@/lib/constants"
  );
  const settings = await getSiteSettings();

  const whatsappNumber = settings?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMessage = settings?.whatsappMessage || WHATSAPP_MESSAGE;

  return {
    address: settings?.address || CONTACT.address,
    phone: settings?.phone || CONTACT.phone,
    phoneHref: settings?.phoneHref || CONTACT.phoneHref,
    email: settings?.email || CONTACT.email,
    hours: settings?.hours || CONTACT.hours,
    coverage: settings?.coverage || CONTACT.coverage,
    mapEmbedSrc: settings?.mapEmbedSrc || CONTACT.mapEmbedSrc,
    whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`,
    linkedinUrl: settings?.linkedinUrl || "https://linkedin.com",
    instagramUrl: settings?.instagramUrl || "https://instagram.com",
  };
}

export async function getPageDoc<T = Record<string, unknown>>(
  type: string
): Promise<T | null> {
  return sanityFetch(`*[_type == "${type}"][0]`, {}, null);
}
