"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  iconBgClass: string;
  iconColorClass: string;
  changeClass: string;
}

export default function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  iconBgClass,
  iconColorClass,
  changeClass,
}: MetricCardProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 bg-card border border-border rounded-lg p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center justify-center rounded-md size-9 ${iconBgClass}`}
        >
          <Icon className={`size-4 ${iconColorClass}`} />
        </div>
        <span
          className={`text-xs font-medium rounded-full px-2 py-0.5 ${changeClass}`}
        >
          {change}
        </span>
      </div>
      <div>
        <div className="text-foreground font-headings font-semibold text-[26px] -tracking-[0.5px] leading-none">
          {value}
        </div>
        <div className="text-muted-foreground text-[13px] mt-0.5">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
