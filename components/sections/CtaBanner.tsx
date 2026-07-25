import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { getContactInfo } from "@/sanity/lib/queries";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export async function CtaBanner({
  eyebrow = "¿Tienes un proyecto en mente?",
  title = "Hablemos y encontremos la solución ideal para tu operación.",
  ctaLabel = "Cotiza tu proyecto",
  ctaHref = "/cotiza-tu-proyecto",
}: CtaBannerProps) {
  const { whatsappHref } = await getContactInfo();

  return (
    <section className="bg-kd-green-dark">
      <div className="container py-12 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <p className="eyebrow font-semibold !text-white/70">{eyebrow}</p>
          <h2 className="mt-1.5 text-h2-mobile lg:text-h2-desktop text-white max-w-xl">
            {title}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Button asChild variant="white" size="lg">
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Escríbenos por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
