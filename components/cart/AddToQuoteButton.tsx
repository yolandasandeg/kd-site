"use client";

import * as React from "react";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";

interface AddToQuoteButtonProps {
  slug: string;
  name: string;
  code: string;
  imageSrc: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  iconOnly?: boolean;
  className?: string;
}

export function AddToQuoteButton({
  slug,
  name,
  code,
  imageSrc,
  variant = "outline",
  size = "default",
  iconOnly = false,
  className,
}: AddToQuoteButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ slug, name, code, imageSrc });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={iconOnly ? "icon" : size}
      onClick={handleClick}
      aria-label="Agregar a cotización"
      className={cn(className)}
    >
      {justAdded ? (
        <Check className="h-4 w-4" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
      {!iconOnly && (justAdded ? "Agregado" : "Agregar a cotización")}
    </Button>
  );
}
