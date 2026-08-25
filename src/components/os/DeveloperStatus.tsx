"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Status = "available" | "busy" | "away";

const STATUS_CONFIG: Record<Status, { label: string; color: string; dot: string }> = {
  available: {
    label: "Available for Projects",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  busy: {
    label: "Currently Busy",
    color: "text-amber-400",
    dot: "bg-amber-400",
  },
  away: {
    label: "Away",
    color: "text-faint",
    dot: "bg-faint",
  },
};

function getStatus(): Status {
  const hour = new Date().getHours();
  // Weekday working hours approximation
  if (hour >= 9 && hour < 17) return "available";
  if (hour >= 17 && hour < 21) return "busy";
  return "away";
}

export function DeveloperStatus() {
  const [status, setStatus] = useState<Status>("available");

  useEffect(() => {
    setStatus(getStatus());
    const interval = setInterval(() => setStatus(getStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  const config = STATUS_CONFIG[status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.dot} opacity-75`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
      </span>
      <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
    </motion.div>
  );
}
