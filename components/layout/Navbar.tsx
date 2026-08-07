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
import { PRODUCTS_MENU } from "@/lib/data/productsMenu";

type NavLink = { href: string; label: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function ProductsDropdown() {
  return (
    <div className="pointer-events-none absolute left-0 top-full w-72 pt-2 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
      <div className="rounded-xl border border-kd-border bg-white p-2 shadow-lg">
        {PRODUCTS_MENU.map((industry) => (
          <div key={industry.label}>
            <Link
              href={industry.href}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-kd-text-primary hover:bg-kd-surface-alt hover:text-kd-green"
            >
              {industry.label}
            </Link>
            {industry.subcategories && (
              <div className="ml-3 border-l border-kd-border pl-3">
                {industry.subcategories.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className="block rounded-lg px-3 py-1.5 text-sm text-kd-text-secondary hover:bg-kd-surface-alt hover:text-kd-green"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface NavbarProps {
  kdpackLogo?: SanityImageRef;
  navLinks?: NavLink[];
}

export function Navbar({ kdpackLogo, navLinks = DEFAULT_NAV_LINKS }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow",
        scrolled ? "shadow-sm" : "border-b border-kd-border"
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-4">
        <Link
          href="/"
          className="relative h-8 w-[110px] shrink-0 block"
          aria-label="KD Pack — ir al inicio"
        >
          {kdpackLogo?.asset?._ref ? (
            <Image
              src={urlFor(kdpackLogo as SanityImage).height(64).fit("max").auto("format").url()}
              alt="KD Pack"
              fill
              className="object-contain object-left"
              sizes="110px"
              priority
            />
          ) : (
            <span className="text-lg font-bold text-kd-text-primary leading-8">KD Pack</span>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const hasDropdown = link.href.startsWith("/productos");
            return (
              <div key={link.href} className={cn(hasDropdown && "group relative")}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-kd-text-primary hover:text-kd-green transition-colors pb-1 border-b-2 border-transparent",
                    isActive(pathname, link.href) && "text-kd-green border-kd-green"
                  )}
                >
                  {link.label}
                </Link>
                {hasDropdown && <ProductsDropdown />}
              </div>
            );
          })}
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
            <nav className="mt-6 flex flex-col gap-1 overflow-y-auto" aria-label="Navegación móvil">
              {navLinks.map((link) => {
                const hasDropdown = link.href.startsWith("/productos");
                return (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-3 text-base font-medium text-kd-text-primary hover:bg-kd-surface-alt",
                        isActive(pathname, link.href) && "text-kd-green bg-kd-green-light"
                      )}
                    >
                      {link.label}
                    </Link>
                    {hasDropdown && (
                      <div className="ml-4 border-l border-kd-border pl-3">
                        {PRODUCTS_MENU.map((industry) => (
                          <div key={industry.label}>
                            <Link
                              href={industry.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-kd-text-primary hover:bg-kd-surface-alt"
                            >
                              {industry.label}
                            </Link>
                            {industry.subcategories && (
                              <div className="ml-3 border-l border-kd-border pl-3">
                                {industry.subcategories.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-lg px-3 py-1.5 text-sm text-kd-text-secondary hover:bg-kd-surface-alt"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
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
