"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre y apellido."),
  company: z.string().optional(),
  email: z.string().email("Ingresa un correo electrónico válido."),
  phone: z.string().optional(),
  industry: z.string().optional(),
  message: z
    .string()
    .min(10, "Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres)."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    // TODO: conectar a backend/CRM
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Contact form submission", values);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-kd-border bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-kd-green" />
        <h3 className="mt-4 text-lg font-semibold text-kd-text-primary">
          ¡Mensaje enviado con éxito!
        </h3>
        <p className="mt-2 text-sm text-kd-text-secondary">
          Gracias por escribirnos. Nuestro equipo te contactará a la brevedad.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Enviar otro mensaje
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
        Completa el formulario y te contactaremos a la brevedad.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Nombre y apellido *</Label>
          <Input id="contact-name" autoComplete="name" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-company">Empresa</Label>
          <Input id="contact-company" autoComplete="organization" {...register("company")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-email">Correo electrónico *</Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-phone">Teléfono</Label>
          <Input id="contact-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="contact-industry">Industria</Label>
          <Select
            value={watch("industry")}
            onValueChange={(value) => setValue("industry", value)}
          >
            <SelectTrigger id="contact-industry">
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
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="contact-message">Cuéntanos sobre tu proyecto *</Label>
          <Textarea
            id="contact-message"
            placeholder="Describe tu necesidad, volúmenes, medidas referenciales o cualquier detalle que nos ayude a entender tu proyecto."
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs text-red-600">{errors.message.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-kd-text-secondary">
        <ShieldCheck className="h-3.5 w-3.5 text-kd-green" />
        Tus datos están protegidos. No compartimos tu información con terceros.
      </p>
    </form>
  );
}
