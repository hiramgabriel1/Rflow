import Topbar from "@/components/topbar";
import MetricCard from "@/components/metric-card";
import InvestigationCard from "@/components/investigation-card";
import ActionCard from "@/components/action-card";
import OpportunityItem from "@/components/opportunity-item";
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
  Radar,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Topbar />
      <div className="flex flex-1 min-w-0">
        <div className="flex-1 min-w-0 px-8 py-8 overflow-visible">
          <div className="mb-8 pb-8 border-b border-border">
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
          </div>
          <div className="grid grid-cols-4 gap-4 mb-8">
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
          </div>
          <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
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
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-headings font-semibold text-foreground text-[15px]">
                  Opportunity Feed
                </h2>
                <span className="bg-primary text-primary-foreground rounded-full text-[11px] font-medium flex items-center justify-center size-5">
                  4
                </span>
              </div>
              <a className="text-primary text-[13px] font-medium" href="#">
                View all
              </a>
            </div>
            <div className="bg-card border border-border rounded-lg px-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <OpportunityItem
                icon={Users}
                title="243 potential prospects found in SaaS vertical"
                description="Based on your Salesforce competitor investigation."
                time="5m ago"
                tag="Prospects"
                tagClass="bg-info-soft text-info"
                iconBgClass="bg-info-soft"
                iconColorClass="text-info"
              />
              <OpportunityItem
                icon={Radar}
                title="New competitor detected: Apollo.io expansion"
                description="Entering your target market in EMEA region."
                time="22m ago"
                tag="Competitor"
                tagClass="bg-warning-soft text-warning"
                iconBgClass="bg-warning-soft"
                iconColorClass="text-warning"
              />
              <OpportunityItem
                icon={TrendingUp}
                title="High-growth niche: AI SDR tools market +42%"
                description="Strong buying signals from Series B companies."
                time="1h ago"
                tag="Market"
                tagClass="bg-success-soft text-success"
                iconBgClass="bg-success-soft"
                iconColorClass="text-success"
              />
              <OpportunityItem
                icon={Megaphone}
                title="Optimize your Q4 outbound campaign"
                description="AI suggests 3 changes to improve reply rate by 28%."
                time="2h ago"
                tag="Campaign"
                tagClass="bg-secondary text-primary"
                iconBgClass="bg-secondary"
                iconColorClass="text-primary"
              />
            </div>
          </div>
        </div>
        <AIPanel />
      </div>
    </>
  );
}
