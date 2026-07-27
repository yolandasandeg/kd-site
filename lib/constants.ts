export const SITE_NAME = "KD Plus";
export const SITE_URL = "https://kdpack.cl";

export const CONTACT = {
  address: "Camino Padre Hurtado 16.301, Paine, Región Metropolitana, Chile",
  phone: "+56 2 2824 9870",
  phoneHref: "tel:+56228249870",
  email: "hola@kdpack.cl",
  hours: "Lunes a viernes de 8:30 a 18:00 hrs.",
  coverage: "Envíos a todo Chile y presencia en LATAM y el mundo.",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Camino+Padre+Hurtado+16301,+Paine,+Chile&output=embed",
};

export const DEFAULT_NAV_LINKS = [
  { label: "KD Pack", href: "/" },
  { label: "Konstruplast", href: "/konstruplast" },
  { label: "Productos", href: "/productos" },
  { label: "Industrias", href: "/industrias" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" },
];

export const WHATSAPP_NUMBER = "56228249870";
export const WHATSAPP_MESSAGE = "Hola, quiero cotizar un proyecto con KD Pack.";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
