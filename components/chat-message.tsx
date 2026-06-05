"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Building2, MapPin, Send, Search } from "lucide-react";

const iconMap: Record<string, typeof Users> = {
  users: Users,
  building: Building2,
  map: MapPin,
  send: Send,
  search: Search,
};

interface ChatMessageProps {
  role: "user" | "ai";
  content?: string;
  time?: string;
  name?: string;
  stats?: { value: string; label: string; icon: string }[];
  followUp?: string;
  action?: { label: string; href: string };
  typing?: boolean;
}

export default function ChatMessage({
  role,
  content,
  time,
  name,
  stats,
  followUp,
  action,
  typing,
}: ChatMessageProps) {
  const isUser = role === "user";

  if (typing) {
    return (
      <motion.div
        className="flex items-start gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center bg-primary rounded-full size-6 flex-shrink-0">
          <span className="text-primary-foreground text-[10px] font-bold">
            R
          </span>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-full px-4 py-2">
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" />
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]" />
          <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isUser ? (
        <Image
          src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/European/0"
          alt=""
          className="rounded-full size-6 flex-shrink-0"
          width={24}
          height={24}
        />
      ) : (
        <div className="flex items-center justify-center bg-primary rounded-full size-6 flex-shrink-0">
          <span className="text-primary-foreground text-[10px] font-bold">
            R
          </span>
        </div>
      )}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && name && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-foreground text-[13px] font-medium">
              {name}
            </span>
            <span className="text-muted-foreground text-[11px]">{time}</span>
          </div>
        )}
        {isUser && (
          <div className="bg-foreground text-background rounded-2xl rounded-tr-sm px-5 py-3 max-w-[480px] text-[13px] leading-[1.5]">
            {content}
          </div>
        )}
        {!isUser && content && (
          <div className="bg-background border border-border rounded-2xl rounded-tl-sm px-5 py-3 max-w-[480px] text-[13px] leading-[1.5] text-foreground">
            {content}
          </div>
        )}
        {stats && (
          <div className="flex gap-3 mt-3">
            {stats.map((stat) => {
              const Icon = iconMap[stat.icon] || Users;
              return (
                <div
                  key={stat.label}
                  className="bg-background border border-border rounded-lg px-4 py-3 flex flex-col gap-1 min-w-[120px]"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-3.5 text-primary" />
                    <span className="text-foreground text-[18px] font-semibold leading-none">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-[11px]">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {followUp && (
          <div className="bg-background border border-border rounded-2xl rounded-tl-sm px-5 py-3 max-w-[480px] text-[13px] leading-[1.5] text-foreground mt-3">
            {followUp}
          </div>
        )}
        {action && (
          <button className="mt-3 flex items-center gap-1.5 bg-primary text-primary-foreground rounded-md px-4 py-2 text-[12px] font-medium">
            <Send className="size-3" />
            {action.label}
            <Send className="size-3" />
          </button>
        )}
        {isUser && time && (
          <span className="text-muted-foreground text-[11px] mt-1">
            {time}
          </span>
        )}
      </div>
    </motion.div>
  );
}
