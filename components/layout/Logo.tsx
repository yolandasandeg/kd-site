import Link from "next/link";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textColor = variant === "light" ? "text-white" : "text-kd-black";
  const subColor = variant === "light" ? "text-white/60" : "text-kd-text-secondary";

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
