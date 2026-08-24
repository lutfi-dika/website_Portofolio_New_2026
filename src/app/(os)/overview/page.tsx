import type { Metadata } from "next";
import { OverviewView } from "./OverviewView";

export const metadata: Metadata = {
  title: "Overview",
  description: "System overview of LUTFI.DEV — every section of the dashboard at a glance.",
  alternates: { canonical: "/overview" },
};

export default function OverviewPage() {
  return <OverviewView />;
}
