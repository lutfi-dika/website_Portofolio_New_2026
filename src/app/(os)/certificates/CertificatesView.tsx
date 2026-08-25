"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { certificates, type Certificate } from "@/data/certificates";
import { PageHeader, EmptyState } from "@/components/os/DashboardWidget";
import { Modal } from "@/components/os/Lightbox";
import { useT } from "@/lib/i18n";

export function CertificatesView() {
  const t = useT();
  const [preview, setPreview] = useState<Certificate | null>(null);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  const markFailed = (id: string) =>
    setFailedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const certTitle = (cert: Certificate) =>
    t.certificates.items[cert.titleKey as keyof typeof t.certificates.items] ?? cert.titleKey;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title={t.certificates.title} subtitle={t.certificates.subtitle} />

      {certificates.length === 0 ? (
        <EmptyState
          icon={<Award className="h-5 w-5" aria-hidden />}
          title={t.certificates.empty}
          hint={t.certificates.emptyHint}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => {
            const title = certTitle(cert);
            return (
              <button
                key={cert.id}
                onClick={() => setPreview(cert)}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-accent/40"
              >
                {/* Preview area */}
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${cert.accent}18, transparent 60%), var(--surface)`,
                  }}
                >
                  {failedIds.has(cert.id) ? (
                    <Award
                      className="h-12 w-12 transition-transform group-hover:scale-110"
                      style={{ color: cert.accent }}
                      aria-hidden
                    />
                  ) : (
                    <Image
                      src={cert.fileUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={() => markFailed(cert.id)}
                    />
                  )}
                  <span className="absolute bottom-3 right-3 rounded-md bg-background/70 px-1.5 py-0.5 font-mono text-[10px] text-faint backdrop-blur-sm">
                    {cert.year}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 font-semibold">{title}</h3>
                  <p className="mt-0.5 text-sm text-muted">{cert.issuer}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Modal
        open={preview !== null}
        onClose={() => setPreview(null)}
        title={preview ? certTitle(preview) : ""}
      >
        {preview && (
          <div className="space-y-3">
            {failedIds.has(preview.id) ? (
              <div
                className="flex aspect-[4/3] items-center justify-center rounded-xl border border-border"
                style={{
                  background: `linear-gradient(135deg, ${preview.accent}18, transparent 60%), var(--surface)`,
                }}
              >
                <Award className="h-16 w-16" style={{ color: preview.accent }} aria-hidden />
              </div>
            ) : (
              <Image
                src={preview.fileUrl}
                alt={certTitle(preview)}
                width={1200}
                height={900}
                className="h-auto max-h-[60vh] w-full rounded-xl border border-border bg-surface object-contain"
                onError={() => markFailed(preview.id)}
              />
            )}
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-faint">{t.certificates.issued}</dt>
                <dd className="font-medium">
                  {preview.issuer} · {preview.year}
                </dd>
              </div>
              {preview.credentialId && (
                <div className="flex justify-between gap-4">
                  <dt className="text-faint">{t.certificates.credentialId}</dt>
                  <dd className="font-mono text-xs">{preview.credentialId}</dd>
                </div>
              )}
            </dl>
            <a
              href={preview.externalUrl ?? preview.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-background hover:brightness-110"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              {t.certificates.viewCertificate}
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}
