import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  Target,
  ArrowRight,
  Zap,
} from "lucide-react";

const competitionColors: Record<string, string> = {
  Low: "text-success",
  Medium: "text-warning",
  High: "text-primary",
};

interface OpportunityResultProps {
  title: string;
  description: string;
  score: number;
  revenue: string;
  audienceSize: string;
  competition: string;
  competitionLevel: number;
  strategy: string;
  tags: string[];
  trend: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function OpportunityResult({
  title,
  description,
  score,
  revenue,
  audienceSize,
  competition,
  strategy,
  tags,
  trend,
  icon: Icon,
  iconBg,
  iconColor,
}: OpportunityResultProps) {
  const scoreColor =
    score >= 90
      ? "text-success"
      : score >= 75
        ? "text-primary"
        : "text-warning";
  const scoreBg =
    score >= 90
      ? "bg-success-soft"
      : score >= 75
        ? "bg-secondary"
        : "bg-warning-soft";

  return (
    <div className="bg-card border border-border rounded-lg p-5 group hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center rounded-md size-10 ${iconBg}`}>
            <Icon className={`size-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-foreground font-medium text-[15px]">{title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-success text-[12px] font-medium flex items-center gap-0.5">
                <TrendingUp className="size-3" />
                {trend}
              </span>
              <span className="text-muted-foreground text-[12px]">growth</span>
            </div>
          </div>
        </div>
        <div className={`flex items-center justify-center rounded-lg size-12 ${scoreBg}`}>
          <span className={`text-[18px] font-bold ${scoreColor}`}>{score}</span>
        </div>
      </div>
      <p className="text-muted-foreground text-[12px] leading-[1.5] mb-4">
        {description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-muted rounded-md p-2.5 text-center">
          <div className="text-foreground font-semibold text-[14px]">
            {revenue}
          </div>
          <div className="text-muted-foreground text-[10px] mt-0.5">
            Est. Revenue
          </div>
        </div>
        <div className="bg-muted rounded-md p-2.5 text-center">
          <div className="text-foreground font-semibold text-[14px]">
            {audienceSize}
          </div>
          <div className="text-muted-foreground text-[10px] mt-0.5">
            Audience
          </div>
        </div>
        <div className="bg-muted rounded-md p-2.5 text-center">
          <div className={`font-semibold text-[14px] ${competitionColors[competition]}`}>
            {competition}
          </div>
          <div className="text-muted-foreground text-[10px] mt-0.5">
            Competition
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-muted text-muted-foreground text-[10px] font-medium rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="bg-sidebar border border-border rounded-md p-3 mb-3">
        <div className="flex items-center gap-1.5 mb-1">
          <Target className="size-3 text-primary" />
          <span className="text-foreground text-[11px] font-medium">
            Recommended Strategy
          </span>
        </div>
        <p className="text-muted-foreground text-[11px] leading-[1.5]">
          {strategy}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-md px-3 py-2 text-[12px] font-medium">
          <Zap className="size-3.5" />
          Target This
        </button>
        <button className="flex items-center justify-center gap-1.5 bg-background border border-border rounded-md px-3 py-2 text-[12px] text-foreground">
          Details
          <ArrowRight className="size-3" />
        </button>
      </div>
    </div>
  );
}
