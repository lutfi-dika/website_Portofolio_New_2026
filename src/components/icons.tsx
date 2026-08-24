import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  SiBootstrap,
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPhpmyadmin,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Braces, Code2, Layers, MoveVertical, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; style?: React.CSSProperties }>;

const socialMap: Record<string, IconType> = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
};

const techMap: Record<string, IconType> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  aos: MoveVertical as IconType,
  php: SiPhp,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  git: SiGit,
  "github-skill": SiGithub,
  vscode: Code2 as IconType,
  figma: SiFigma,
  vercel: SiVercel,
  uiverse: Sparkles as IconType,
  flowbite: Layers as IconType,
  geekshelp: Braces as IconType,
  phpmyadmin: SiPhpmyadmin,
};

interface IconProps {
  name: string;
  className?: string;
}

export function SocialIcon({ name, className }: IconProps) {
  const Cmp = socialMap[name];
  return Cmp ? <Cmp className={className} /> : null;
}

export function TechIcon({ name, className, color }: IconProps & { color?: string }) {
  const Cmp = techMap[name];
  return Cmp ? <Cmp className={className} style={color ? { color } : undefined} /> : null;
}

/** GitHub brand icon as a drop-in LucideIcon (lucide v1 dropped brand icons). */
export const GithubBrandIcon = FaGithub as unknown as LucideIcon;
