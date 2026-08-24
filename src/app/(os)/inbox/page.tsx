import type { Metadata } from "next";
import { InboxView } from "./InboxView";

export const metadata: Metadata = {
  title: "Inbox",
  description: "Local inbox of messages sent through the contact form.",
  alternates: { canonical: "/inbox" },
};

export default function InboxPage() {
  return <InboxView />;
}
