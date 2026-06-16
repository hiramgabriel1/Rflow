"use client";

import { useState } from "react";
import { mutate } from "swr";
import {
  Sparkles,
  Target,
  Building2,
  Zap,
  BarChart3,
  Globe,
  Shield,
  ChevronDown,
  Send,
  Filter,
  Camera,
  Share2,
} from "lucide-react";
import { api } from "@/lib/api";
import SocialProfileInput from "@/components/social-profile-input";
import CompetitorInput from "@/components/competitor-input";
import CompetitorList from "@/components/competitor-list";
import CompetitorDetail from "@/components/competitor-detail";
import OpportunityResult from "@/components/opportunity-result";
import OpportunityMetrics from "@/components/opportunity-metrics";

type AnalysisMode = "competitors" | "social";

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

export default function OpportunityFinderPage() {
  const [mode, setMode] = useState<AnalysisMode>("social");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTarget, setSearchTarget] = useState<{ type: string; value: string } | null>(null);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string | null>(null);
  const [competitorLoading, setCompetitorLoading] = useState(false);

  const handleCompetitorAnalyze = async (url: string) => {
    setCompetitorLoading(true);
    try {
      await api.analyzeCompetitor(url);
      mutate("competitors");
      setSearchTarget({ type: "competitor", value: url });
      setHasSearched(true);
    } catch {
      // ignore
    } finally {
      setCompetitorLoading(false);
    }
  };

  const getTargetIcon = () => {
    if (!searchTarget) return null;
    switch (searchTarget.type) {
      case "instagram":
        return <Camera className="size-3.5 text-primary" />;
      case "facebook":
        return <Share2 className="size-3.5 text-primary" />;
      case "competitor":
        return <Building2 className="size-3.5 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div>
          <h1 className="font-headings font-semibold text-foreground text-[20px]">
            Opportunity Finder
          </h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">
            Analyze companies, competitors, or social profiles to find opportunities.
          </p>
        </div>
      </div>
      <div className="flex-1 min-w-0 px-4 py-4 lg:px-8 lg:py-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => { setMode("competitors"); setHasSearched(false); setSelectedCompetitorId(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              mode === "competitors"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-4" />
            Competitors
          </button>
          <button
            onClick={() => { setMode("social"); setHasSearched(false); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              mode === "social"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Camera className="size-4" />
            Social
          </button>
        </div>

        {mode === "competitors" && (
          <div className="flex flex-col gap-6">
            <CompetitorInput onAnalyze={handleCompetitorAnalyze} loading={competitorLoading} />
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
                <span className="text-[13px] font-medium text-foreground">
                  Analyzed Competitors
                </span>
              </div>
              {selectedCompetitorId ? (
                <CompetitorDetail
                  id={selectedCompetitorId}
                  onBack={() => setSelectedCompetitorId(null)}
                />
              ) : (
                <CompetitorList onSelectCompetitor={setSelectedCompetitorId} />
              )}
            </div>
          </div>
        )}
        {mode === "social" && <SocialProfileInput />}

        {hasSearched && searchTarget && mode === "competitors" && (
          <>
            <div className="bg-muted/50 border border-border rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
              <div className="flex items-center justify-center bg-primary/10 rounded-md size-7">
                {getTargetIcon()}
              </div>
              <div>
                <span className="text-[12px] text-muted-foreground capitalize">
                  Analyzing {searchTarget.type}
                </span>
                <p className="text-[13px] font-medium text-foreground">{searchTarget.value}</p>
              </div>
            </div>
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
                      Based on your {searchTarget.type === "competitor" ? "competitor" : "social profile"} analysis, the{" "}
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
