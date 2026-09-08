export const currentlyBuilding = {
  project: "BSI Multi-Role Dashboard",
  statusKey: "inProgress",
  tech: ["PHP","MYSQL","Talwind.css", "Javascript","Chart.js","Font Awesom","PDF","Excel","Email","WhatsAPP OTP"],
  progress: 80,
  client: "Bank Syariah Indonesia — PKL",
} as const;

export interface LearningItem {
  name: string;
  icon: string;
  color: string;
}

export const currentlyLearning: LearningItem[] = [
  { name: "Next.js", icon: "nextjs", color: "#e2e8f0" },
  { name: "Laravel", icon: "laravel", color: "#ff2d20" },
  { name: "UI/UX", icon: "figma", color: "#a259ff" },
  { name: "Cyber Security", icon: "cybersecurity", color: "#38bdf8" },
];
