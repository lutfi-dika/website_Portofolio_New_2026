import type { Metadata } from "next";
import { ResumeView } from "./ResumeView";

export const metadata: Metadata = {
  title: "Resume — LUTFI.DEV",
  description:
    "Resume dan profil profesional Muhammad Lutfi Andika — Frontend Developer, skills, pengalaman, project, dan sertifikat.",
};

export default function ResumePage() {
  return <ResumeView />;
}
