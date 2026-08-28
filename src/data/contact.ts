export interface ContactChannel {
  id: string;
  label: string;
  /** translation key describing the channel */
  descriptionKey: string;
  href: string;
  icon: "email" | "whatsapp" | "github" | "instagram" | "linkedin";
}

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    descriptionKey: "contactEmailDesc",
    href: "mailto:lutfiandika33@gmail.com",
    icon: "email",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    descriptionKey: "contactWhatsappDesc",
    href: "https://wa.me/6281295431853",
    icon: "whatsapp",
  },
  {
    id: "github",
    label: "GitHub",
    descriptionKey: "contactGithubDesc",
    href: "https://github.com/lutfi-dika",
    icon: "github",
  },
  {
    id: "instagram",
    label: "Instagram",
    descriptionKey: "contactInstagramDesc",
    href: "https://instagram.com/303.andika",
    icon: "instagram",
  },
  {
    id: "linkedin",
    label: "Linkedin",
    descriptionKey: "contactLinkedinDesc",
    href: "https://id.linkedin.com/in/lutfi-andika-8709453a2",
    icon: "linkedin",
  },
];
