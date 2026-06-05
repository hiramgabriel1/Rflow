"use client";

import { motion } from "framer-motion";
import Topbar from "@/components/topbar";
import MetricCard from "@/components/metric-card";
import InvestigationCard from "@/components/investigation-card";
import ActionCard from "@/components/action-card";
import AIPanel from "@/components/ai-panel";
import ActivityChart from "@/components/activity-chart";
import {
  Sparkles,
  ScanSearch,
  Bot,
  Users,
  BadgeCheck,
  Megaphone,
  Lightbulb,
  Building2,
  Database,
  Search,
  Send,
  TrendingUp,
  BookOpen,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Topbar />
      <div className="flex flex-1 min-w-0">
        <div className="flex-1 min-w-0 px-8 py-8 overflow-visible">
          <motion.div
            className="mb-8 pb-8 border-b border-border"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-secondary text-primary rounded-full px-3 py-1 text-[12px] font-medium inline-flex items-center gap-1">
                    <Sparkles className="size-[11px]" />
                    AI-Powered Intelligence
                  </span>
                </div>
                <h1 className="font-headings font-semibold text-foreground mb-2 text-[34px] -tracking-[0.8px] leading-[1.15] max-w-[560px]">
                  Find, Understand and Reach
                  <br />
                  <span className="text-primary">Your Next Customers</span>
                </h1>
                <p className="text-muted-foreground text-[15px] max-w-[460px] leading-[1.6]">
                  AI-powered business intelligence, prospect discovery and
                  outreach automation.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <button className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-2.5 text-[13px] font-medium">
                    <ScanSearch className="size-3.5" />
                    Start Investigation
                  </button>
                  <button className="flex items-center gap-2 bg-background border border-border text-foreground rounded-md px-5 py-2.5 text-[13px] font-medium">
                    <Bot className="size-3.5" />
                    Open AI Chat
                  </button>
                </div>
              </div>
              <ActivityChart />
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-4 gap-4 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            <MetricCard
              icon={Users}
              label="Prospects Found"
              value="48,320"
              change="+18%"
              iconBgClass="bg-secondary"
              iconColorClass="text-primary"
              changeClass="bg-success-soft text-success"
            />
            <MetricCard
              icon={BadgeCheck}
              label="Verified Contacts"
              value="12,904"
              change="+11%"
              iconBgClass="bg-info-soft"
              iconColorClass="text-info"
              changeClass="bg-success-soft text-success"
            />
            <MetricCard
              icon={Megaphone}
              label="Active Campaigns"
              value="7"
              change="+2"
              iconBgClass="bg-success-soft"
              iconColorClass="text-success"
              changeClass="bg-success-soft text-success"
            />
            <MetricCard
              icon={Lightbulb}
              label="Opportunities"
              value="1,582"
              change="+34%"
              iconBgClass="bg-warning-soft"
              iconColorClass="text-warning"
              changeClass="bg-success-soft text-success"
            />
          </motion.div>
          <motion.div
            className="grid gap-6 mb-8"
            style={{ gridTemplateColumns: "1fr 1fr" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headings font-semibold text-foreground text-[15px]">
                  Recent Investigations
                </h2>
                <a className="text-primary text-[13px] font-medium" href="#">
                  View all
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <InvestigationCard
                  icon={Building2}
                  company="Salesforce Inc."
                  description="Competitor Analysis"
                  time="2h ago"
                  leads={1240}
                  insights={34}
                />
                <InvestigationCard
                  icon={Database}
                  company="HubSpot CRM"
                  description="Lead Discovery"
                  time="5h ago"
                  leads={890}
                  insights={21}
                />
                <InvestigationCard
                  icon={Search}
                  company="Outreach.io"
                  description="Market Research"
                  time="1d ago"
                  leads={560}
                  insights={18}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headings font-semibold text-foreground text-[15px]">
                  AI Quick Actions
                </h2>
              </div>
              <div
                className="grid grid-cols-2 gap-3"
                style={{ gridTemplateRows: "auto auto auto" }}
              >
                <ActionCard
                  icon={ScanSearch}
                  title="Analyze Competitor"
                  description="Deep-dive any company instantly"
                  variant="primary"
                />
                <ActionCard
                  icon={Users}
                  title="Find New Prospects"
                  description="AI-targeted lead discovery"
                />
                <ActionCard
                  icon={Send}
                  title="Generate Campaign"
                  description="Automated outreach sequences"
                />
                <ActionCard
                  icon={TrendingUp}
                  title="Market Opportunities"
                  description="Discover high-growth niches"
                />
                <ActionCard
                  icon={BookOpen}
                  title="Research Industry"
                  description="Full vertical intelligence"
                />
              </div>
            </div>
          </motion.div>
        </div>
        <AIPanel />
      </div>
    </>
  );
}
