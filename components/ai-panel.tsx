"use client";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  ArrowUpCircle,
  MessageSquare,
  Zap,
  Target,
  BarChart2,
} from "lucide-react";

const recentChats = [
  { title: "Analyze Hubspot competitors in EMEA", time: "12m ago" },
  { title: "Find SaaS companies hiring sales reps", time: "1h ago" },
  { title: "Generate outreach for CFOs in fintech", time: "3h ago" },
];

const suggestedActions = [
  { icon: Zap, label: "Run weekly market scan" },
  { icon: Target, label: "Find decision-makers at Series B startups" },
  { icon: BarChart2, label: "Benchmark against top 5 competitors" },
];

const trendingTopics = [
  { label: "AI SDR tools", change: "+42%" },
  { label: "B2B SaaS outbound", change: "+28%" },
  { label: "RevOps automation", change: "+19%" },
];

export default function AIPanel() {
  return (
    <motion.aside
      className="flex flex-col bg-sidebar border-l border-border w-[280px] flex-shrink-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-primary rounded-md size-7">
            <Sparkles className="size-3 text-primary-foreground" />
          </div>
          <span className="text-foreground font-headings font-semibold text-[14px]">
            AI Assistant
          </span>
          <span className="ml-auto flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-success" />
            <span className="text-success text-[11px]">Active</span>
          </span>
        </div>
      </div>
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2 bg-input border border-border rounded-md px-3 py-2.5">
          <MessageCircle className="size-3 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground text-[12px] flex-1">
            Ask anything...
          </span>
          <ArrowUpCircle className="size-3.5 text-primary flex-shrink-0" />
        </div>
      </div>
      <div className="px-5 py-4 border-b border-border">
        <div className="text-muted-foreground uppercase text-[11px] font-medium tracking-[0.06em] mb-3">
          Recent
        </div>
        <div className="flex flex-col">
          {recentChats.map((chat) => (
            <button
              key={chat.title}
              className="flex items-start gap-2.5 py-2.5 border-b border-border last:border-b-0 text-left"
            >
              <MessageSquare className="size-3 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-foreground text-[12px] leading-[1.4]">
                  {chat.title}
                </div>
                <div className="text-muted-foreground text-[11px]">
                  {chat.time}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 border-b border-border">
        <div className="text-muted-foreground uppercase text-[11px] font-medium tracking-[0.06em] mb-3">
          Suggested
        </div>
        <div className="flex flex-col gap-2">
          {suggestedActions.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2.5 bg-background border border-border rounded-md px-3 py-2.5 text-left"
            >
              <action.icon className="size-3 text-primary flex-shrink-0" />
              <span className="text-foreground text-[12px]">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="text-muted-foreground uppercase text-[11px] font-medium tracking-[0.06em] mb-3">
          Trending
        </div>
        <div className="flex flex-col">
          {trendingTopics.map((topic) => (
            <div
              key={topic.label}
              className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0"
            >
              <span className="text-foreground text-[12px]">{topic.label}</span>
              <span className="text-success text-[12px] font-medium">
                {topic.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
