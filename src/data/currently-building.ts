export const currentlyBuilding = {
  project: "BSI Multi-Role Dashboard",
  statusKey: "inProgress",
  tech: ["PHP", "MySQL", "Tailwind CSS", "JavaScript", "Chart.js", "Font Awesome 6", "FPDF", "PHPExcel", "PHPMailer", "Fonnte API"],
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
