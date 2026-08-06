import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { getContactInfo } from "@/sanity/lib/queries";
import { Logo } from "@/components/layout/Logo";
import { PRODUCTS_MENU } from "@/lib/data/productsMenu";
import type { SanityImageRef } from "@/sanity/lib/image";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const navigationLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/industrias", label: "Industrias" },
  { href: "/industrias/construccion", label: "Construcción" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/sustentabilidad", label: "Sustentabilidad" },
  { href: "/ubicacion", label: "Ubicación" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

interface FooterProps {
  logoImage?: SanityImageRef;
}

export async function Footer({ logoImage }: FooterProps) {
  const contact = await getContactInfo();

  return (
    <footer className="bg-kd-black text-white">
      <div className="container py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" logoImage={logoImage} />
          <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
            {contact.footerTagline}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de KD Pack"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-kd-green hover:text-kd-green transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Industrias
          </h3>
          <ul className="mt-4 space-y-2.5">
            {PRODUCTS_MENU.map((industry) => (
              <li key={industry.label}>
                <Link
                  href={industry.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {industry.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-kd-green" />
              <span>{contact.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-kd-green" />
              <a href={contact.phoneHref} className="hover:text-white transition-colors">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-kd-green" />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-white transition-colors"
              >
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} KD Pack. Todos los derechos reservados.</p>
          <div className="flex items-center gap-5">
            <Link href="/politica-de-privacidad" className="hover:text-white">
              Política de privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="hover:text-white">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
