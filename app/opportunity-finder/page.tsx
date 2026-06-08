"use client";

import { useState } from "react";
import {
  Sparkles,
  Target,
  Building2,
  ArrowRight,
  Zap,
  BarChart3,
  Globe,
  Shield,
  ChevronDown,
  Send,
  Filter,
} from "lucide-react";
import OpportunityInput from "@/components/opportunity-input";
import OpportunityResult from "@/components/opportunity-result";
import OpportunityMetrics from "@/components/opportunity-metrics";

const opportunities = [
  {
    id: 1,
    title: "AI SDR Tools Market",
    description: "Rapidly growing segment with high demand for automated outreach solutions. Series B+ companies actively investing in sales tech.",
    score: 94,
    revenue: "$2.4M",
    audienceSize: "12,400",
    competition: "Medium",
    competitionLevel: 3,
    strategy: "Target VP Sales at Series B SaaS companies with AI-powered outreach demos",
    tags: ["High Growth", "SaaS", "Enterprise"],
    trend: "+42%",
    icon: Zap,
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    id: 2,
    title: "RevOps Automation",
    description: "Companies consolidating sales, marketing and customer success ops into unified revenue operations.",
    score: 88,
    revenue: "$1.8M",
    audienceSize: "8,200",
    competition: "Low",
    competitionLevel: 2,
    strategy: "Position as the connective layer between existing sales tools",
    tags: ["Emerging", "Operations", "Mid-Market"],
    trend: "+28%",
    icon: BarChart3,
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },
  {
    id: 3,
    title: "Fintech Compliance Tech",
    description: "Regulatory changes driving demand for automated compliance and risk management solutions.",
    score: 82,
    revenue: "$3.1M",
    audienceSize: "5,600",
    competition: "High",
    competitionLevel: 4,
    strategy: "Focus on mid-market fintechs underserved by enterprise solutions",
    tags: ["Regulated", "Fintech", "Enterprise"],
    trend: "+19%",
    icon: Shield,
    iconBg: "bg-info-soft",
    iconColor: "text-info",
  },
  {
    id: 4,
    title: "Remote Work Infrastructure",
    description: "Distributed teams need better collaboration and productivity tools as hybrid work becomes permanent.",
    score: 76,
    revenue: "$1.2M",
    audienceSize: "18,900",
    competition: "High",
    competitionLevel: 4,
    strategy: "Niche down to specific verticals like dev tools or creative agencies",
    tags: ["Saturated", "B2B", "SMB"],
    trend: "+8%",
    icon: Globe,
    iconBg: "bg-warning-soft",
    iconColor: "text-warning",
  },
];

const competitors = [
  {
    name: "Apollo.io",
    marketShare: "24%",
    strength: "Large database, affordable pricing",
    weakness: "Data quality issues, limited AI features",
    opportunity: "Position as premium AI-first alternative",
  },
  {
    name: "ZoomInfo",
    marketShare: "31%",
    strength: "Enterprise-grade data, strong brand",
    weakness: "Expensive, complex onboarding",
    opportunity: "Target mid-market with simpler, faster solution",
  },
  {
    name: "HubSpot Sales Hub",
    marketShare: "18%",
    strength: "All-in-one platform, free tier",
    weakness: "Limited prospecting depth, generic AI",
    opportunity: "Deep vertical intelligence vs broad CRM features",
  },
];

export default function OpportunityFinderPage() {
  const [hasSearched, setHasSearched] = useState(false);
  const [companyUrl, setCompanyUrl] = useState<string | undefined>();

  const handleSearch = (url?: string) => {
    setCompanyUrl(url);
    setHasSearched(true);
  };

  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div>
          <h1 className="font-headings font-semibold text-foreground text-[20px]">
            Opportunity Finder
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Describe your business. AI finds your next customers.
          </p>
        </div>
      </div>
      <div className="flex-1 min-w-0 px-4 py-4 lg:px-8 lg:py-6 overflow-y-auto">
        <OpportunityInput onSearch={handleSearch} />

        {hasSearched && (
          <>
            {companyUrl && (
              <div className="bg-muted/50 border border-border rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
                <div className="flex items-center justify-center bg-primary/10 rounded-md size-7">
                  <Globe className="size-3.5 text-primary" />
                </div>
                <div>
                  <span className="text-[12px] text-muted-foreground">Analyzing</span>
                  <p className="text-[13px] font-medium text-foreground">{companyUrl}</p>
                </div>
              </div>
            )}
            <OpportunityMetrics />

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-headings font-semibold text-foreground text-[16px]">
                    Top Opportunities
                  </h2>
                  <span className="bg-primary text-primary-foreground rounded-full text-[11px] font-medium flex items-center justify-center size-5">
                    4
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-1.5 text-[12px] text-foreground">
                    <Filter className="size-3.5" />
                    Filter
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </button>
                  <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-3 py-1.5 text-[12px] text-foreground">
                    Sort by Score
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {opportunities.map((opp) => (
                  <OpportunityResult key={opp.id} {...opp} />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headings font-semibold text-foreground text-[16px]">
                  Competitive Landscape
                </h2>
                <button className="flex items-center gap-1 text-primary text-[13px] font-medium">
                  Full analysis
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[12px] font-medium text-muted-foreground px-5 py-3">
                        COMPETITOR
                      </th>
                      <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                        MARKET SHARE
                      </th>
                      <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                        STRENGTH
                      </th>
                      <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                        WEAKNESS
                      </th>
                      <th className="text-left text-[12px] font-medium text-muted-foreground px-4 py-3">
                        YOUR OPPORTUNITY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp) => (
                      <tr
                        key={comp.name}
                        className="border-b border-border last:border-b-0 hover:bg-muted/30"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center bg-muted rounded-md size-8">
                              <Building2 className="size-3.5 text-muted-foreground" />
                            </div>
                            <span className="text-foreground text-[13px] font-medium">
                              {comp.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: comp.marketShare }}
                              />
                            </div>
                            <span className="text-[13px] text-foreground font-medium">
                              {comp.marketShare}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-[12px] text-foreground max-w-[200px]">
                          {comp.strength}
                        </td>
                        <td className="px-4 py-3.5 text-[12px] text-muted-foreground max-w-[200px]">
                          {comp.weakness}
                        </td>
                        <td className="px-4 py-3.5 text-[12px] text-primary font-medium max-w-[200px]">
                          {comp.opportunity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 mb-6">
              <div className="bg-secondary border border-primary/20 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center bg-primary rounded-md size-8 flex-shrink-0">
                    <Sparkles className="size-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium text-[14px] mb-1">
                      AI Recommendation
                    </h3>
                    <p className="text-muted-foreground text-[13px] leading-[1.6]">
                      Based on your business description, the{" "}
                      <span className="text-foreground font-medium">
                        AI SDR Tools market
                      </span>{" "}
                      presents the highest opportunity with a score of{" "}
                      <span className="text-primary font-semibold">94/100</span>.
                      We recommend starting with a targeted campaign focusing on{" "}
                      <span className="text-foreground font-medium">
                        VP Sales at Series B SaaS companies
                      </span>
                      . Estimated pipeline value:{" "}
                      <span className="text-success font-semibold">$2.4M</span>{" "}
                      across 12,400 potential accounts.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-md px-4 py-2 text-[12px] font-medium">
                        <Send className="size-3.5" />
                        Launch Campaign
                      </button>
                      <button className="flex items-center gap-1.5 bg-background border border-border rounded-md px-4 py-2 text-[12px] text-foreground">
                        <Target className="size-3.5" />
                        Find Prospects
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
