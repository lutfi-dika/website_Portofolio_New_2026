import type { Metadata } from "next";
import { ProjectsView } from "./ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project dashboard of Muhammad Lutfi Andika — BSI Company Profile, BSI Multi-Role Dashboard, EduCare, and Webkraf Digital Studio.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
