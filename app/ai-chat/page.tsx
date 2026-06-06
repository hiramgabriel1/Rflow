"use client";

import { Sparkles, Clock, Plus } from "lucide-react";
import ChatMessage from "@/components/chat-message";
import ChatInput from "@/components/chat-input";
import ChatHistory from "@/components/chat-history";

const messages = [
  {
    role: "user" as const,
    content:
      "Analyze Salesforce competitors in the EMEA market and find me 50 qualified prospects.",
    time: "10:42 AM",
  },
  {
    role: "ai" as const,
    name: "RubyFlow AI",
    time: "10:42 AM",
    content:
      "Sure! I'm analyzing Salesforce's competitive landscape across EMEA right now. Here's what I've found so far:",
    stats: [
      { value: "14", label: "Competitors identified", icon: "building" },
      { value: "347", label: "Qualified prospects", icon: "users" },
      { value: "12", label: "Markets covered", icon: "map" },
    ],
    followUp:
      "I've identified 14 direct competitors and surfaced 347 qualified prospects across 12 EMEA markets. The strongest opportunities are in Germany, Netherlands and Sweden — where Salesforce's market share is under pressure from HubSpot and Pipedrive.\n\nShould I generate a targeted outreach campaign for the top 50 prospects, or would you like to refine the criteria first?",
  },
  {
    role: "user" as const,
    content:
      "Yes, generate outreach for the top 50. Focus on VP Sales and CRO titles.",
    time: "10:45 AM",
  },
  {
    role: "ai" as const,
    name: "RubyFlow AI",
    time: "10:45 AM",
    content:
      "Perfect. Generating personalized outreach sequences for 50 prospects targeting VP Sales and CRO contacts...",
    followUp:
      "Your campaign is ready. I've created 3-step sequences with personalized first lines for each prospect. Open rate projection: 42%. Reply rate projection: 18%. Would you like to launch now or review the messages first?",
    action: { label: "View Campaign", href: "#" },
  },
  {
    role: "ai" as const,
    name: "RubyFlow AI",
    typing: true,
  },
];

const chatConversations = [
  { title: "Salesforce EMEA analysis", time: "Today, 10:42" },
  { title: "HubSpot competitor deep-dive", time: "Today, 9:15" },
  { title: "Find CFOs in fintech sector", time: "Yesterday" },
  { title: "Series B SaaS prospect list", time: "Yesterday" },
  { title: "RevOps market research", time: "Mon, Jul 7" },
  { title: "Apollo.io competitive intel", time: "Mon, Jul 7" },
];

const capabilities = [
  { label: "Prospect discovery", icon: "users" },
  { label: "Competitor intelligence", icon: "building" },
  { label: "Outreach generation", icon: "send" },
  { label: "Market research", icon: "search" },
];

export default function AIChatPage() {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-primary rounded-md size-7">
            <Sparkles className="size-3 text-primary-foreground" />
          </div>
          <div>
            <span className="text-foreground font-headings font-semibold text-[14px]">
              AI Chat
            </span>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success" />
              <span className="text-muted-foreground text-[11px]">
                Online · RubyFlow Intelligence v2
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-1.5 text-[12px] text-muted-foreground">
            <Clock className="size-3" />
            History
          </button>
          <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-1.5 text-[12px] text-muted-foreground">
            <Plus className="size-3" />
            New Chat
          </button>
        </div>
      </div>
      <div className="flex flex-1 min-w-0">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-8 lg:py-6">
            <div className="max-w-[720px] mx-auto flex flex-col gap-6">
              {messages.map((msg, i) => (
                <ChatMessage key={i} {...msg} />
              ))}
            </div>
          </div>
          <div className="px-4 pb-4 lg:px-8 lg:pb-6">
            <div className="max-w-[720px] mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="flex items-center gap-1.5 bg-background border border-border rounded-full px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
                  <span className="text-primary"></span>
                  Analyze @competitor
                </button>
                <button className="flex items-center gap-1.5 bg-background border border-border rounded-full px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
                  <span className="text-primary">⌘</span>
                  Find similar businesses
                </button>
                <button className="flex items-center gap-1.5 bg-background border border-border rounded-full px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
                  <span className="text-primary">⌘</span>
                  Find decision makers
                </button>
                <button className="flex items-center gap-1.5 bg-background border border-border rounded-full px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
                  <span className="text-primary">⌘</span>
                  Generate outreach campaign
                </button>
                <button className="flex items-center gap-1.5 bg-background border border-border rounded-full px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
                  <span className="text-primary"></span>
                  Discover prospects from TiKTok
                </button>
                <button className="flex items-center gap-1.5 bg-background border border-border rounded-full px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground">
                  <span className="text-primary">⌘</span>
                  Research my competitors
                </button>
              </div>
              <ChatInput />
            </div>
          </div>
        </div>
        <div className="hidden xl:block">
          <ChatHistory conversations={chatConversations} capabilities={capabilities} />
        </div>
      </div>
    </>
  );
}
