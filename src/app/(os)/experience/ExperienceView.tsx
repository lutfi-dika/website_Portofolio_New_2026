"use client";

import { PageHeader } from "@/components/os/DashboardWidget";
import { ExperienceTimeline } from "@/components/os/ExperienceTimeline";
import { useT } from "@/lib/i18n";

export function ExperienceView() {
  const t = useT();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title={t.experience.title} subtitle={t.experience.subtitle} />
      <ExperienceTimeline />
    </div>
  );
}
