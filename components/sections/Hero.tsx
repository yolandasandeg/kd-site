import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon-map";
import { resolveImageSrc, type SanityImageRef } from "@/sanity/lib/image";

export interface HeroCta {
  label: string;
  href: string;
  icon?: string;
}

export interface HeroBadge {
  icon: string;
  label: string;
}

export interface HeroTitlePart {
  text: string;
  highlight?: boolean;
}

interface HeroProps {
  variant?: "dark" | "light";
  layout?: "split" | "full";
  eyebrow: string;
  titleParts: HeroTitlePart[];
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  badges?: HeroBadge[];
  imageAlt: string;
  imageBg?: string;
  image?: SanityImageRef;
  /** 0-100: how dark the overlay over the background photo is (only used when layout="full"). */
  overlayOpacity?: number;
  /** CSS object-position for the split-layout image, e.g. "center" or "right center" (only used when layout="split"). */
  imagePosition?: string;
  children?: React.ReactNode;
}

export function Hero({
  variant = "dark",
  layout = "split",
  eyebrow,
  titleParts,
  subtitle,
  primaryCta,
  secondaryCta,
  badges,
  imageAlt,
  imageBg = "1C7A43",
  image,
  overlayOpacity = 55,
  imagePosition = "center",
  children,
}: HeroProps) {
  const isDark = variant === "dark";

  const title = (
    <h1
      className={cn(
        layout === "full"
          ? "text-[38px] leading-[1.15] font-semibold lg:text-h1-desktop"
          : "text-h1-mobile lg:text-h1-desktop",
        "max-w-xl",
        isDark ? "text-white" : "text-kd-text-primary"
      )}
    >
      {titleParts.map((part, i) => (
        <span
          key={i}
          className={
            part.highlight
              ? layout === "full"
                ? "text-white lg:text-kd-green"
                : "text-kd-green"
              : undefined
          }
        >
          {part.text}{" "}
        </span>
      ))}
    </h1>
  );

  const ctas = (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <Button asChild size="lg">
        <Link href={primaryCta.href}>
          {primaryCta.icon && <Icon name={primaryCta.icon} className="h-4 w-4" />}
          {primaryCta.label}
          {!primaryCta.icon && <ArrowRight className="h-4 w-4" />}
        </Link>
      </Button>
      {secondaryCta && (
        <Button
          asChild
          size="lg"
          variant={isDark ? "outlineLight" : "outline"}
        >
          <Link href={secondaryCta.href}>
            {secondaryCta.icon && (
              <Icon name={secondaryCta.icon} className="h-4 w-4" />
            )}
            {secondaryCta.label}
            {!secondaryCta.icon && <ArrowRight className="h-4 w-4" />}
          </Link>
        </Button>
      )}
    </div>
  );

  const badgeRow = badges && badges.length > 0 && (
    <div className="mt-10 lg:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl">
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2.5">
          <Icon
            name={badge.icon}
            className={cn(
              "h-5 w-5 shrink-0",
              isDark ? "text-kd-green" : "text-kd-green"
            )}
          />
          <span
            className={cn(
              "text-sm leading-snug",
              isDark ? "text-white/80" : "text-kd-text-secondary"
            )}
          >
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );

  if (layout === "full") {
    return (
      <section
        className={cn(
          "relative overflow-hidden",
          isDark ? "bg-kd-black" : "bg-white"
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={resolveImageSrc(image, imageBg, "1600x700")}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Fixed legibility gradient behind the text zone: never controlled
              by the slider below, so text always stays readable. */}
          <div className="absolute inset-0 bg-gradient-to-r from-kd-black from-10% via-kd-black/75 via-45% to-transparent to-75%" />
          {/* Slider-controlled mood tint over the whole photo. */}
          <div
            className="absolute inset-0 bg-kd-black"
            style={{
              opacity: (Math.min(100, Math.max(0, overlayOpacity)) / 100) * 0.45,
            }}
          />
        </div>
        <div className="relative container pt-10 pb-20 lg:pt-16 lg:pb-24 animate-fade-in-up">
          <p className="eyebrow font-semibold drop-shadow-sm">{eyebrow}</p>
          <div className="mt-4 drop-shadow-sm">{title}</div>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-white/90 drop-shadow-sm">
            {subtitle}
          </p>
          {ctas}
          {badgeRow}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={cn(isDark ? "bg-kd-black" : "bg-white")}>
      <div className="container grid lg:grid-cols-2 gap-10 lg:gap-8 items-center py-14 lg:py-20">
        <div className="animate-fade-in-up">
          <p className="eyebrow font-semibold">{eyebrow}</p>
          <div className="mt-4">{title}</div>
          <p
            className={cn(
              "mt-5 max-w-lg text-sm sm:text-base",
              isDark ? "text-white/70" : "text-kd-text-secondary"
            )}
          >
            {subtitle}
          </p>
          {ctas}
          {badgeRow}
          {children}
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={resolveImageSrc(image, imageBg, "1000x750")}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: imagePosition }}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
