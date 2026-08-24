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
    href: "mailto:lutfiandika.dev@gmail.com",
    icon: "email",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    descriptionKey: "contactWhatsappDesc",
    href: "https://wa.me/6281234567890",
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
    href: "https://instagram.com/lutfiandika",
    icon: "instagram",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    descriptionKey: "contactLinkedinDesc",
    href: "https://linkedin.com/in/lutfiandika",
    icon: "linkedin",
  },
];
