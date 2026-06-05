"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "primary" | "default";
}

export default function ActionCard({
  icon: Icon,
  title,
  description,
  variant = "default",
}: ActionCardProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      className={`flex flex-col gap-3 rounded-lg p-5 text-left border ${
        isPrimary
          ? "bg-primary border-primary shadow-[0_4px_16px_rgba(215,38,56,0.16)]"
          : "bg-card border-border shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
      }`}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`flex items-center justify-center rounded-md size-9 ${
          isPrimary ? "bg-primary-foreground/20" : "bg-muted"
        }`}
      >
        <Icon
          className={`size-4 ${
            isPrimary ? "text-primary-foreground" : "text-primary"
          }`}
        />
      </div>
      <div>
        <div
          className={`text-[13px] font-medium ${
            isPrimary ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {title}
        </div>
        <div
          className={`text-[12px] mt-0.5 ${
            isPrimary ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </div>
      </div>
    </motion.button>
  );
}
