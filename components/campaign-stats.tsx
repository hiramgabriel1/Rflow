"use client";

import { motion } from "framer-motion";
import { Mail, Eye, MessageSquare, MousePointerClick, Zap, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Mail,
    label: "Total Sent",
    value: "8,598",
    change: "+1,240",
    changeType: "up" as const,
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    icon: Eye,
    label: "Avg. Open Rate",
    value: "42%",
    change: "+5%",
    changeType: "up" as const,
    iconBg: "bg-info-soft",
    iconColor: "text-info",
  },
  {
    icon: MessageSquare,
    label: "Avg. Reply Rate",
    value: "16%",
    change: "+3%",
    changeType: "up" as const,
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },
  {
    icon: MousePointerClick,
    label: "Avg. Click Rate",
    value: "7.5%",
    change: "+1.2%",
    changeType: "up" as const,
    iconBg: "bg-warning-soft",
    iconColor: "text-warning",
  },
  {
    icon: Zap,
    label: "Active Sequences",
    value: "4",
    change: "+2",
    changeType: "up" as const,
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    label: "Revenue Attributed",
    value: "$48.2K",
    change: "+$12K",
    changeType: "up" as const,
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },
];

export default function CampaignStats() {
  return (
    <motion.div
      className="grid grid-cols-6 gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: 0.1 },
        },
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="bg-card border border-border rounded-lg p-4"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center rounded-md size-8 ${stat.iconBg}`}>
              <stat.icon className={`size-3.5 ${stat.iconColor}`} />
            </div>
            <span className="text-success text-[11px] font-medium flex items-center gap-0.5">
              <TrendingUp className="size-3" />
              {stat.change}
            </span>
          </div>
          <div className="text-foreground font-headings font-semibold text-[20px] -tracking-[0.3px]">
            {stat.value}
          </div>
          <div className="text-muted-foreground text-[11px] mt-0.5">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
