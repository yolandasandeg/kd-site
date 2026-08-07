import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

/**
 * Layout compartido de las páginas legales. El contenido se pasa como JSX y se
 * estiliza acá para que todas las páginas legales se vean iguales.
 */
export function LegalPage({ eyebrow, title, updatedAt, children }: LegalPageProps) {
  return (
    <>
      <section className="border-b border-kd-border bg-white">
        <div className="container py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-kd-text-secondary"
          >
            <Link href="/" className="hover:text-kd-green">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-kd-text-primary">{title}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="border-l-2 border-kd-green pl-4">
            <p className="eyebrow font-semibold">{eyebrow}</p>
            <h1 className="mt-1.5 text-h1-mobile lg:text-h2-desktop text-kd-text-primary">
              {title}
            </h1>
          </div>
          <p className="mt-3 text-sm text-kd-text-secondary">{updatedAt}</p>

          <div
            className="
              mt-8 text-sm sm:text-base leading-relaxed text-kd-text-secondary
              [&>p]:mt-4
              [&>h2]:mt-9 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-kd-text-primary
              [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2
              [&_a]:text-kd-green [&_a]:underline hover:[&_a]:text-kd-green-dark
              [&_strong]:text-kd-text-primary [&_strong]:font-semibold
            "
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
