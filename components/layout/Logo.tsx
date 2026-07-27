import Link from "next/link";
import Image from "next/image";
import type { Image as SanityImage } from "sanity";

import { cn } from "@/lib/utils";
import { urlFor, type SanityImageRef } from "@/sanity/lib/image";

interface LogoProps {
  variant?: "dark" | "light";
  logoImage?: SanityImageRef;
}

export function Logo({ variant = "dark", logoImage }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-kd-black";
  const subColor = variant === "light" ? "text-white/60" : "text-kd-text-secondary";

  if (logoImage?.asset?._ref) {
    const src = urlFor(logoImage as SanityImage)
      .height(80)
      .fit("max")
      .auto("format")
      .url();

    return (
      <Link href="/" className="flex items-center" aria-label="KD Plus - Inicio">
        <span className="relative h-9 w-[100px] sm:h-10 sm:w-[112px]">
          <Image
            src={src}
            alt="KD Plus"
            fill
            priority
            className={cn(
              "object-contain object-left",
              variant === "light" && "brightness-0 invert"
            )}
            sizes="112px"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="KD Plus - Inicio">
      <span className={`text-2xl font-bold tracking-tight ${textColor}`}>
        KD<span className="text-kd-green">+</span>
      </span>
      <span
        className={`hidden sm:block text-[11px] leading-tight uppercase tracking-wide ${subColor}`}
      >
        corporativa /<br />
        tecnológica
      </span>
    </Link>
  );
}
