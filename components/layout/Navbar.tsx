"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import type { Image as SanityImage } from "sanity";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { urlFor, type SanityImageRef } from "@/sanity/lib/image";
import { DEFAULT_NAV_LINKS } from "@/lib/constants";

type NavLink = { href: string; label: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

// Hrefs of the two sub-brands that show a logo image instead of their text label.
function brandLogoKeyFor(href: string): "kdpack" | "konstruplast" | undefined {
  if (href === "/") return "kdpack";
  if (href === "/konstruplast") return "konstruplast";
  return undefined;
}

interface NavbarProps {
  kdpackLogo?: SanityImageRef;
  konstruplastLogo?: SanityImageRef;
  navLinks?: NavLink[];
}

export function Navbar({
  kdpackLogo,
  konstruplastLogo,
  navLinks = DEFAULT_NAV_LINKS,
}: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const brandLogos: Record<string, SanityImageRef> = {
    kdpack: kdpackLogo,
    konstruplast: konstruplastLogo,
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function NavLinkLabel({ link }: { link: NavLink }) {
    const logoKey = brandLogoKeyFor(link.href);
    const brandLogo = logoKey ? brandLogos[logoKey] : undefined;
    if (brandLogo?.asset?._ref) {
      return (
        <span className="relative h-5 w-[88px] block">
          <Image
            src={urlFor(brandLogo as SanityImage).height(60).fit("max").auto("format").url()}
            alt={link.label}
            fill
            className="object-contain object-left"
            sizes="88px"
          />
        </span>
      );
    }
    return <>{link.label}</>;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow",
        scrolled ? "shadow-sm" : "border-b border-kd-border"
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-4">
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-kd-text-primary hover:text-kd-green transition-colors pb-1 border-b-2 border-transparent",
                isActive(pathname, link.href) && "text-kd-green border-kd-green"
              )}
            >
              <NavLinkLabel link={link} />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <Link href="/cotiza-tu-proyecto">
              Cotiza tu proyecto
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-kd-border"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] sm:max-w-sm flex flex-col">
            <SheetHeader>
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium text-kd-text-primary hover:bg-kd-surface-alt",
                    isActive(pathname, link.href) && "text-kd-green bg-kd-green-light"
                  )}
                >
                  <NavLinkLabel link={link} />
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <Button asChild className="w-full" onClick={() => setMobileOpen(false)}>
                <Link href="/cotiza-tu-proyecto">
                  Cotiza tu proyecto
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
