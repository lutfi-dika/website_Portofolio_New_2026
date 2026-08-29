"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { contactChannels } from "@/data/contact";
import { PageHeader } from "@/components/os/DashboardWidget";
import { SocialIcon } from "@/components/icons";
import { useT } from "@/lib/i18n";
import { useInbox } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

export function ContactView() {
  const t = useT();
  const toast = useToast();
  const { addMessage } = useInbox();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const setField = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (form.name.trim().length < 2) next.name = t.contact.errorName as string;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t.contact.errorEmail as string;
    if (!form.subject.trim()) next.subject = t.contact.errorSubject as string;
    if (form.message.trim().length < 10) next.message = t.contact.errorMessage as string;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addMessage({
      sender: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });

    const waNumber = contactChannels.find((c) => c.icon === "whatsapp")?.href?.replace("https://wa.me/", "") || "6281295431853";
    const waText = [
      `Halo Lutfi! Ada pesan baru dari website portfolio.`,
      ``,
      `Nama: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Subjek: ${form.subject.trim()}`,
      ``,
      `${form.message.trim()}`,
    ].join("\n");

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setForm(EMPTY_FORM);
    toast(t.contact.successToast, "success");
  };

  const inputClass = (invalid?: string) =>
    cn(
      "w-full rounded-xl border bg-input-bg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-faint",
      invalid ? "border-red-400/60 focus:border-red-400" : "border-border focus:border-accent",
    );

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Form */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 lg:col-span-3"
          aria-label={t.contact.formTitle}
        >
          <h2 className="font-display text-lg font-bold">{t.contact.formTitle}</h2>
          <p className="mt-1 text-sm text-muted">{t.contact.formSubtitle}</p>

          <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.contact.name} error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setField("name")(e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  aria-label={t.contact.name}
                  aria-invalid={!!errors.name}
                  className={inputClass(errors.name)}
                />
              </Field>
              <Field label={t.contact.email} error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email")(e.target.value)}
                  placeholder={t.contact.emailPlaceholder}
                  aria-label={t.contact.email}
                  aria-invalid={!!errors.email}
                  className={inputClass(errors.email)}
                />
              </Field>
            </div>

            <Field label={t.contact.subject} error={errors.subject}>
              <input
                value={form.subject}
                onChange={(e) => setField("subject")(e.target.value)}
                placeholder={t.contact.subjectPlaceholder}
                aria-label={t.contact.subject}
                aria-invalid={!!errors.subject}
                className={inputClass(errors.subject)}
              />
            </Field>

            <Field label={t.contact.message} error={errors.message}>
              <textarea
                value={form.message}
                onChange={(e) => setField("message")(e.target.value)}
                placeholder={t.contact.messagePlaceholder}
                aria-label={t.contact.message}
                aria-invalid={!!errors.message}
                rows={5}
                className={cn(inputClass(errors.message), "resize-none")}
              />
            </Field>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-background transition-all hover:brightness-110 active:scale-[0.99] sm:w-auto sm:min-w-44"
            >
              <Send className="h-4 w-4" aria-hidden />
              {t.contact.send}
            </button>
          </form>
        </motion.section>

        {/* Channels */}
        <section className="lg:col-span-2" aria-label={t.contact.channelsTitle}>
          <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            {t.contact.orReachVia}
          </h2>
          <ul className="space-y-2">
            {contactChannels.map((channel, i) => (
              <motion.li
                key={channel.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <a
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    {channel.icon === "email" ? (
                      <Mail className="h-4.5 w-4.5" aria-hidden />
                    ) : (
                      <SocialIcon name={channel.icon} className="h-4 w-4" />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{channel.label}</span>
                    <span className="block text-xs text-muted">
                      {t.contact[channel.descriptionKey as keyof typeof t.contact]}
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}
