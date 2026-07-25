import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon-map";

export interface FeatureItem {
  icon: string;
  title: string;
  description?: string;
}

const LG_COLS_CLASS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "sm:grid-cols-1 lg:grid-cols-1",
  2: "sm:grid-cols-2 lg:grid-cols-2",
  3: "sm:grid-cols-3 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-3 lg:grid-cols-5",
};

interface FeatureRowProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: FeatureItem[];
  background?: "white" | "alt" | "dark";
  layout?: "plain" | "card";
}

export function FeatureRow({
  eyebrow,
  title,
  subtitle,
  items,
  background = "white",
  layout = "plain",
}: FeatureRowProps) {
  const isDark = background === "dark";

  return (
    <section
      className={cn(
        "py-16 lg:py-20",
        background === "alt" && "bg-kd-surface-alt",
        isDark && "bg-kd-black"
      )}
    >
      <div className="container">
        {(eyebrow || title) && (
          <div className="max-w-2xl border-l-2 border-kd-green pl-4 mb-10">
            {eyebrow && (
              <p className="eyebrow font-semibold">{eyebrow}</p>
            )}
            {title && (
              <h2
                className={cn(
                  "mt-1.5 text-h2-mobile lg:text-h2-desktop",
                  isDark ? "text-white" : "text-kd-text-primary"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-3 text-sm sm:text-base",
                  isDark ? "text-white/70" : "text-kd-text-secondary"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            "grid grid-cols-2 gap-6",
            LG_COLS_CLASS[Math.min(items.length, 5) as 1 | 2 | 3 | 4 | 5]
          )}
        >
          {items.map((item) =>
            layout === "card" ? (
              <div
                key={item.title}
                className={cn(
                  "rounded-xl border p-5",
                  isDark
                    ? "border-white/15 bg-white/5"
                    : "border-kd-border bg-white"
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-kd-green-light">
                  <Icon name={item.icon} className="h-5 w-5 text-kd-green" />
                </div>
                <h3
                  className={cn(
                    "mt-4 text-sm font-semibold",
                    isDark ? "text-white" : "text-kd-text-primary"
                  )}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className={cn(
                      "mt-1.5 text-xs leading-relaxed",
                      isDark ? "text-white/60" : "text-kd-text-secondary"
                    )}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            ) : (
              <div key={item.title} className="flex flex-col items-start">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border",
                    isDark
                      ? "border-kd-green/50"
                      : "border-kd-green/40"
                  )}
                >
                  <Icon name={item.icon} className="h-5 w-5 text-kd-green" />
                </div>
                <h3
                  className={cn(
                    "mt-3.5 text-sm font-semibold",
                    isDark ? "text-white" : "text-kd-text-primary"
                  )}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className={cn(
                      "mt-1.5 text-xs leading-relaxed",
                      isDark ? "text-white/60" : "text-kd-text-secondary"
                    )}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
