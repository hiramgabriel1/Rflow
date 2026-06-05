"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  ChevronDown,
  Filter,
  Pause,
  Sparkles,
  Mail,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import CampaignStats from "@/components/campaign-stats";
import SequenceFlow from "@/components/sequence-flow";
import CampaignBuilder from "@/components/campaign-builder";

const campaigns = [
  {
    id: 1,
    name: "Q4 SaaS Outreach",
    status: "active" as const,
    sent: 2847,
    openRate: 42,
    replyRate: 18,
    clickRate: 8,
    sequence: 3,
    aiGenerated: true,
    lastActivity: "2h ago",
    color: "primary",
  },
  {
    id: 2,
    name: "Competitor Win-Back",
    status: "active" as const,
    sent: 1204,
    openRate: 38,
    replyRate: 14,
    clickRate: 6,
    sequence: 4,
    aiGenerated: true,
    lastActivity: "5h ago",
    color: "primary",
  },
  {
    id: 3,
    name: "Fintech Decision Makers",
    status: "draft" as const,
    sent: 0,
    openRate: 0,
    replyRate: 0,
    clickRate: 0,
    sequence: 3,
    aiGenerated: true,
    lastActivity: "1d ago",
    color: "muted",
  },
  {
    id: 4,
    name: "Enterprise Follow-up",
    status: "completed" as const,
    sent: 890,
    openRate: 51,
    replyRate: 22,
    clickRate: 11,
    sequence: 2,
    aiGenerated: false,
    lastActivity: "3d ago",
    color: "success",
  },
  {
    id: 5,
    name: "Product Launch Series",
    status: "paused" as const,
    sent: 456,
    openRate: 35,
    replyRate: 12,
    clickRate: 5,
    sequence: 5,
    aiGenerated: true,
    lastActivity: "1w ago",
    color: "warning",
  },
  {
    id: 6,
    name: "Cold Outreach - HR Tech",
    status: "active" as const,
    sent: 3201,
    openRate: 44,
    replyRate: 16,
    clickRate: 7,
    sequence: 3,
    aiGenerated: true,
    lastActivity: "30m ago",
    color: "primary",
  },
];

const statusConfig: Record<string, { label: string; class: string; icon: typeof CheckCircle2 }> = {
  active: { label: "Active", class: "bg-success-soft text-success", icon: CheckCircle2 },
  draft: { label: "Draft", class: "bg-muted text-muted-foreground", icon: Clock },
  completed: { label: "Completed", class: "bg-info-soft text-info", icon: CheckCircle2 },
  paused: { label: "Paused", class: "bg-warning-soft text-warning", icon: Pause },
};

export default function CampaignsPage() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);

  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div>
          <h1 className="font-headings font-semibold text-foreground text-[20px]">
            Campaigns
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Manage outreach sequences, AI messages and automation flows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBuilder(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2 text-[13px] font-medium"
          >
            <Plus className="size-3.5" />
            New Campaign
          </button>
        </div>
      </div>
      <div className="flex flex-1 min-w-0">
        <div className="flex-1 min-w-0 px-8 py-6 overflow-y-auto">
          <CampaignStats />

          <div className="flex items-center gap-2 mt-6 mb-4">
            <div className="flex items-center gap-2 bg-input rounded-md px-3 py-2 border border-border w-[240px]">
              <Search className="size-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground text-[13px]">Search campaigns...</span>
            </div>
            <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
              <Filter className="size-3.5" />
              Status
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[13px] text-foreground">
              <Sparkles className="size-3.5 text-primary" />
              AI Generated
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
            <span className="text-muted-foreground text-[12px] ml-2">
              {campaigns.length} campaigns
            </span>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-5 py-3">
                    CAMPAIGN
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    STATUS
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    SENT
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    OPEN RATE
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    REPLY RATE
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    CLICKS
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    SEQUENCE
                  </th>
                  <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                    LAST ACTIVITY
                  </th>
                  <th className="w-10 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, i) => {
                  const status = statusConfig[campaign.status];
                  const StatusIcon = status.icon;
                  return (
                    <motion.tr
                      key={campaign.id}
                      className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer"
                      onClick={() => setSelectedCampaign(campaign)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center rounded-md size-8 ${
                              campaign.aiGenerated ? "bg-secondary" : "bg-muted"
                            }`}
                          >
                            <Mail className="size-3.5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-foreground text-[13px] font-medium">
                                {campaign.name}
                              </span>
                              {campaign.aiGenerated && (
                                <Sparkles className="size-3 text-primary" />
                              )}
                            </div>
                            <span className="text-muted-foreground text-[11px]">
                              {campaign.sequence}-step sequence
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2 py-0.5 ${status.class}`}
                        >
                          <StatusIcon className="size-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[13px] text-foreground">
                        {campaign.sent.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${campaign.openRate}%` }}
                            />
                          </div>
                          <span className="text-[13px] text-foreground font-medium">
                            {campaign.openRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-success rounded-full"
                              style={{ width: `${campaign.replyRate * 3}%` }}
                            />
                          </div>
                          <span className="text-[13px] text-foreground font-medium">
                            {campaign.replyRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[13px] text-foreground">
                        {campaign.clickRate}%
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: campaign.sequence }).map((_, i) => (
                            <div
                              key={i}
                              className={`size-2 rounded-full ${
                                i < campaign.sequence ? "bg-primary" : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[12px] text-muted-foreground">
                        {campaign.lastActivity}
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="text-muted-foreground hover:text-foreground p-1">
                          <MoreHorizontal className="size-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selectedCampaign && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-headings font-semibold text-foreground text-[16px]">
                    {selectedCampaign.name}
                  </h2>
                  <p className="text-muted-foreground text-[12px] mt-0.5">
                    Sequence flow and performance
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <SequenceFlow campaign={selectedCampaign} />
            </div>
          )}
        </div>
      </div>

      {showBuilder && <CampaignBuilder onClose={() => setShowBuilder(false)} />}
    </>
  );
}
