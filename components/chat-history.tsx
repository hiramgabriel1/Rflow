"use client";

import { motion } from "framer-motion";
import { Users, Building2, Send, Search } from "lucide-react";

const iconMap: Record<string, typeof Users> = {
  users: Users,
  building: Building2,
  send: Send,
  search: Search,
};

interface ChatHistoryProps {
  conversations: { title: string; time: string }[];
  capabilities: { label: string; icon: string }[];
}

export default function ChatHistory({
  conversations,
  capabilities,
}: ChatHistoryProps) {
  return (
    <motion.aside
      className="flex flex-col bg-sidebar border-l border-border w-[280px] flex-shrink-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <div className="px-5 py-4 border-b border-border">
        <span className="text-foreground font-headings font-semibold text-[14px]">
          Chat History
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col">
          {conversations.map((conv) => (
            <button
              key={conv.title}
              className="flex flex-col items-start gap-0.5 py-2.5 border-b border-border last:border-b-0 text-left"
            >
              <span className="text-foreground text-[12px] font-medium leading-[1.4]">
                {conv.title}
              </span>
              <span className="text-muted-foreground text-[11px]">
                {conv.time}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 border-t border-border">
        <span className="text-muted-foreground uppercase text-[11px] font-medium tracking-[0.06em] mb-3 block">
          Capabilities
        </span>
        <div className="flex flex-col gap-2">
          {capabilities.map((cap) => {
            const Icon = iconMap[cap.icon] || Search;
            return (
              <div
                key={cap.label}
                className="flex items-center gap-2 text-[12px] text-foreground"
              >
                <Icon className="size-3 text-primary flex-shrink-0" />
                <span>{cap.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
