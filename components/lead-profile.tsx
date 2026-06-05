"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X, Send, Star, Mail, Phone, Globe, Camera, Music2, CheckCircle2, Link2 } from "lucide-react";

interface LeadProfileProps {
  lead: {
    name: string;
    role: string;
    company: string;
    email: string;
    emailVerified: boolean;
    phone: string;
    instagram: string | null;
    tiktok: string | null;
    avatar: string;
    score: number;
    industry: string;
    country: string;
    source: string;
    added: string;
  };
  onClose: () => void;
}

export default function LeadProfile({ lead, onClose }: LeadProfileProps) {
  return (
    <motion.aside
      className="flex flex-col bg-sidebar border-l border-border w-[320px] flex-shrink-0 overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <span className="text-foreground font-headings font-semibold text-[14px]">
          Lead Profile
        </span>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="flex flex-col items-center px-5 py-6 border-b border-border">
        <Image
          src={lead.avatar}
          alt={lead.name}
          className="rounded-full size-16 mb-3"
          width={64}
          height={64}
        />
        <span className="text-foreground font-semibold text-[15px]">
          {lead.name}
        </span>
        <span className="text-muted-foreground text-[12px]">{lead.role}</span>
        <span className="text-muted-foreground text-[12px]">{lead.company}</span>
        <div className="flex items-center gap-1.5 mt-3">
          <span className="size-2 rounded-full bg-success" />
          <span className="text-success text-[13px] font-medium">{lead.score}</span>
        </div>
      </div>
      <div className="px-5 py-4 border-b border-border">
        <span className="text-muted-foreground uppercase text-[11px] font-medium tracking-[0.06em] mb-3 block">
          Contact
        </span>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-foreground">
              <Mail className="size-3.5 text-muted-foreground" />
              {lead.email}
            </div>
            {lead.emailVerified && (
              <CheckCircle2 className="size-3.5 text-success" />
            )}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-foreground">
            <Phone className="size-3.5 text-muted-foreground" />
            {lead.phone}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-foreground">
            <Link2 className="size-3.5 text-muted-foreground" />
            in/{lead.name.toLowerCase().replace(" ", "")}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-foreground">
            <Globe className="size-3.5 text-muted-foreground" />
            {lead.company.toLowerCase().replace(/\s+/g, "")}.com
          </div>
        </div>
      </div>
      <div className="px-5 py-4 border-b border-border">
        <span className="text-muted-foreground uppercase text-[11px] font-medium tracking-[0.06em] mb-3 block">
          Social Media
        </span>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-[12px] text-foreground">
            <Camera className="size-3.5 text-muted-foreground" />
            {lead.instagram || <span className="text-muted-foreground">—</span>}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-foreground">
            <Music2 className="size-3.5 text-muted-foreground" />
            {lead.tiktok || <span className="text-muted-foreground">—</span>}
          </div>
        </div>
      </div>
      <div className="px-5 py-4 border-b border-border">
        <span className="text-muted-foreground uppercase text-[11px] font-medium tracking-[0.06em] mb-3 block">
          Details
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">Industry</span>
            <span className="text-foreground">{lead.industry}</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">Country</span>
            <span className="text-foreground">{lead.country}</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">Source</span>
            <span className="text-foreground">{lead.source}</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">Added</span>
            <span className="text-foreground">{lead.added}</span>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2.5 text-[13px] font-medium mb-2">
          <Send className="size-3.5" />
          Generate Outreach
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-background border border-border rounded-md px-4 py-2.5 text-[13px] text-foreground">
          <Star className="size-3.5" />
          Save to Campaign
        </button>
      </div>
    </motion.aside>
  );
}
