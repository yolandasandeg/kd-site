"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, ShieldCheck, Upload, File as FileIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const industries = [
  "Agrícola",
  "Logística y distribución",
  "Forestal",
  "Almacenaje industrial",
  "Pesquera",
  "Construcción",
  "Otra",
];

const projectTypes = [
  "Nuevo proyecto",
  "Reposición de productos",
  "Desarrollo a medida",
  "Asesoría técnica",
  "Otro",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

const quoteSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre y apellido."),
  company: z.string().min(2, "Ingresa el nombre de tu empresa."),
  email: z.string().email("Ingresa un correo electrónico válido."),
  phone: z.string().min(6, "Ingresa un teléfono de contacto."),
  industry: z.string().min(1, "Selecciona una industria."),
  projectType: z.string().min(1, "Selecciona un tipo de proyecto."),
  description: z
    .string()
    .min(10, "Describe tu proyecto con un poco más de detalle (mínimo 10 caracteres)."),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Debes autorizar el uso de tus datos para continuar.",
    }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "",
      projectType: "",
      description: "",
      consent: false,
    },
  });

  function validateAndSetFile(candidate: File | undefined) {
    if (!candidate) return;
    if (!ACCEPTED_FILE_TYPES.includes(candidate.type)) {
      setFileError("Formato no permitido. Sube un archivo PDF, JPG o PNG.");
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setFileError("El archivo supera el tamaño máximo de 10MB.");
      return;
    }
    setFileError(null);
    setFile(candidate);
  }

  async function onSubmit(values: QuoteFormValues) {
    // TODO: conectar a backend/CRM (incluir adjunto `file` vía FormData)
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Quote form submission", values, file);
    setSubmitted(true);
    reset();
    setFile(null);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-kd-border bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-kd-green" />
        <h3 className="mt-4 text-lg font-semibold text-kd-text-primary">
          ¡Solicitud de cotización enviada!
        </h3>
        <p className="mt-2 text-sm text-kd-text-secondary">
          Gracias por la información. Nuestro equipo revisará tu proyecto y te
          contactará a la brevedad para asesorarte.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Cotizar otro proyecto
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl border border-kd-border bg-white p-6 sm:p-7"
    >
      <h2 className="text-lg font-semibold text-kd-text-primary">
        Cuéntanos sobre tu proyecto
      </h2>
      <p className="mt-1 text-sm text-kd-text-secondary">
        Mientras más información nos entregues, mejor podremos ayudarte.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="quote-name">Nombre y apellido *</Label>
          <Input id="quote-name" autoComplete="name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="quote-company">Empresa *</Label>
          <Input id="quote-company" autoComplete="organization" {...register("company")} />
          {errors.company && (
            <p className="text-xs text-red-600">{errors.company.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="quote-email">Correo electrónico *</Label>
          <Input id="quote-email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="quote-phone">Teléfono *</Label>
          <Input id="quote-phone" type="tel" autoComplete="tel" {...register("phone")} />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="quote-industry">Industria *</Label>
          <Select
            value={watch("industry")}
            onValueChange={(value) =>
              setValue("industry", value, { shouldValidate: true })
            }
          >
            <SelectTrigger id="quote-industry">
              <SelectValue placeholder="Selecciona una industria" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-xs text-red-600">{errors.industry.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="quote-project-type">Tipo de proyecto *</Label>
          <Select
            value={watch("projectType")}
            onValueChange={(value) =>
              setValue("projectType", value, { shouldValidate: true })
            }
          >
            <SelectTrigger id="quote-project-type">
              <SelectValue placeholder="Selecciona el tipo de proyecto" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.projectType && (
            <p className="text-xs text-red-600">{errors.projectType.message}</p>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="quote-description">Cuéntanos sobre tu proyecto *</Label>
          <Textarea
            id="quote-description"
            placeholder="Describe tu necesidad, el uso del producto, cantidades estimadas, medidas referenciales y cualquier detalle que nos ayude a entender tu proyecto."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="quote-file">¿Tienes planos, imágenes o archivos?</Label>
          <p className="text-xs text-kd-text-secondary">
            Puedes adjuntar archivos en formato PDF, JPG o PNG (máx. 10MB cada
            uno).
          </p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              validateAndSetFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
            className={cn(
              "mt-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center cursor-pointer transition-colors",
              isDragging
                ? "border-kd-green bg-kd-green-light"
                : "border-kd-border hover:border-kd-green/50"
            )}
          >
            <Upload className="h-6 w-6 text-kd-text-secondary" />
            <p className="text-sm text-kd-text-secondary">
              Arrastra tus archivos aquí o haz clic para seleccionar
            </p>
            <input
              ref={fileInputRef}
              id="quote-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => validateAndSetFile(e.target.files?.[0])}
            />
          </div>
          {fileError && <p className="text-xs text-red-600">{fileError}</p>}
          {file && !fileError && (
            <div className="flex items-center justify-between gap-2 rounded-lg bg-kd-surface-alt px-3 py-2">
              <span className="flex items-center gap-2 text-xs text-kd-text-primary truncate">
                <FileIcon className="h-3.5 w-3.5 text-kd-green shrink-0" />
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => setFile(null)}
                aria-label="Quitar archivo"
                className="shrink-0 text-kd-text-secondary hover:text-kd-text-primary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="sm:col-span-2 flex items-start gap-2.5">
          <Checkbox
            id="quote-consent"
            className="mt-0.5"
            checked={watch("consent")}
            onCheckedChange={(checked) =>
              setValue("consent", checked === true, {
                shouldValidate: true,
              })
            }
          />
          <Label htmlFor="quote-consent" className="text-sm font-normal leading-snug cursor-pointer">
            Autorizo el uso de mis datos para ser contactado y recibir
            información sobre sus productos y servicios.
          </Label>
        </div>
        {errors.consent && (
          <p className="sm:col-span-2 -mt-3 text-xs text-red-600">
            {errors.consent.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar solicitud de cotización"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-kd-text-secondary">
        <ShieldCheck className="h-3.5 w-3.5 text-kd-green" />
        Tus datos están protegidos. No compartimos tu información con terceros.
      </p>
    </form>
  );
}
