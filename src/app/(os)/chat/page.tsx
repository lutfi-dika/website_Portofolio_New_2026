import type { Metadata } from "next";
import { ChatView } from "./ChatView";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Chat with Lutfi's AI assistant — ask about projects, skills, experience, or how to get in touch.",
  alternates: { canonical: "/chat" },
};

export default function ChatPage() {
  return <ChatView />;
}
