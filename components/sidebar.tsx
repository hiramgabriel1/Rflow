"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Bot,
  Database,
  Megaphone,
  Search,
  GraduationCap,
  Settings,
} from "lucide-react";

const navItems: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "AI Chat", icon: Bot, href: "/ai-chat" },
  { label: "Data Hub", icon: Database, href: "/data-hub" },
  { label: "Campaigns", icon: Megaphone, href: "/campaigns" },
  { label: "Opportunity Finder", icon: Search, href: "/opportunity-finder" },
  { label: "University", icon: GraduationCap, href: "/university" },
  { label: "Settings", icon: Settings, href: "#" },
];

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem = "Dashboard" }: SidebarProps) {
  return (
    <aside className="flex flex-col bg-sidebar border-r border-border w-[220px] h-screen sticky top-0 flex-shrink-0">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="flex items-center justify-center bg-primary rounded-md w-7 h-7">
          <span className="text-primary-foreground font-headings font-bold text-[13px]">
            R
          </span>
        </div>
        <span className="font-headings font-semibold text-foreground text-[15px] -tracking-[0.3px]">
          RubyFlow
        </span>
      </div>
      <nav className="flex flex-col gap-0.5 px-3 pt-4 flex-1">
        {navItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium data-[active=true]:bg-sidebar-active data-[active=true]:text-primary text-muted-foreground"
              data-active={item.label === activeItem ? true : undefined}
            >
              <item.icon className="size-3.5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
      <motion.div
        className="flex flex-col gap-0.5 px-3 pb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-md border border-border bg-background">
          <Image
            src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/European/0"
            alt="Alex Morgan"
            className="rounded-full"
            width={26}
            height={26}
          />
          <div className="flex flex-col gap-px">
            <span className="text-foreground text-[12px] font-medium">
              Alex Morgan
            </span>
            <span className="text-muted-foreground text-[11px]">
              Pro Plan
            </span>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
