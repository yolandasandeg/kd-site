"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/Logo";
import { productCategories } from "@/lib/data/products";

const navLinks = [
  { href: "/", label: "KD Pack" },
  { href: "/konstruplast", label: "Konstruplast" },
  { href: "/productos", label: "Productos", hasMenu: true },
  { href: "/industrias", label: "Industrias", hasMenu: true },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
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
        <Logo />

        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <DropdownMenu.Root key={link.href}>
                <DropdownMenu.Trigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium text-kd-text-primary hover:text-kd-green transition-colors outline-none",
                      isActive(pathname, link.href) &&
                        "text-kd-green underline underline-offset-8 decoration-2"
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="start"
                    sideOffset={16}
                    className="z-50 min-w-[220px] rounded-lg border border-kd-border bg-white p-2 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                  >
                    {link.href === "/productos" ? (
                      <>
                        <DropdownMenu.Item asChild>
                          <Link
                            href="/productos"
                            className="block rounded-md px-3 py-2 text-sm font-semibold text-kd-text-primary hover:bg-kd-green-light hover:text-kd-green-dark outline-none"
                          >
                            Todos los productos
                          </Link>
                        </DropdownMenu.Item>
                        {productCategories.map((c) => (
                          <DropdownMenu.Item asChild key={c.slug}>
                            <Link
                              href={`/productos?categoria=${c.slug}`}
                              className="block rounded-md px-3 py-2 text-sm text-kd-text-secondary hover:bg-kd-green-light hover:text-kd-green-dark outline-none"
                            >
                              {c.label}
                            </Link>
                          </DropdownMenu.Item>
                        ))}
                      </>
                    ) : (
                      <>
                        <DropdownMenu.Item asChild>
                          <Link
                            href="/industrias"
                            className="block rounded-md px-3 py-2 text-sm font-semibold text-kd-text-primary hover:bg-kd-green-light hover:text-kd-green-dark outline-none"
                          >
                            Todas las industrias
                          </Link>
                        </DropdownMenu.Item>
                      </>
                    )}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-kd-text-primary hover:text-kd-green transition-colors",
                  isActive(pathname, link.href) &&
                    "text-kd-green underline underline-offset-8 decoration-2"
                )}
              >
                {link.label}
              </Link>
            )
          )}
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
              <SheetTitle>
                <Logo />
              </SheetTitle>
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
                  {link.label}
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
