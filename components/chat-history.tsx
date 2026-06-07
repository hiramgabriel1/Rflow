"use client";

import { motion } from "framer-motion";
import { Users, Building2, Send, Search, Trash2 } from "lucide-react";

const iconMap: Record<string, typeof Users> = {
  users: Users,
  building: Building2,
  send: Send,
  search: Search,
};

interface ChatHistoryProps {
  conversations: { id: string; title: string; time: string }[];
  capabilities: { label: string; icon: string }[];
  onSelectConversation?: (id: string) => void;
  onDeleteConversation?: (id: string, e: React.MouseEvent) => void;
  activeId?: string;
}

export default function ChatHistory({
  conversations,
  capabilities,
  onSelectConversation,
  onDeleteConversation,
  activeId,
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
          {conversations.length === 0 ? (
            <p className="text-muted-foreground text-[12px]">No conversations yet</p>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-center gap-2 py-2.5 border-b border-border last:border-b-0 group ${
                  activeId ? "cursor-pointer" : ""
                }`}
                onClick={() => onSelectConversation?.(conv.id)}
              >
                <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                  <span className={`text-[12px] font-medium leading-[1.4] truncate w-full ${
                    activeId ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {conv.title}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    {conv.time}
                  </span>
                </div>
                {onDeleteConversation && (
                  <button
                    onClick={(e) => onDeleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-red-500 transition-all"
                  >
                    <Trash2 className="size-3" />
                  </button>
                )}
              </div>
            ))
          )}
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
