import { TrendingUp, Users, Target, BarChart3 } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    label: "Total Addressable Market",
    value: "$14.2B",
    sub: "Across 4 identified segments",
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    label: "Potential Accounts",
    value: "45,100",
    sub: "Qualified leads available",
    iconBg: "bg-info-soft",
    iconColor: "text-info",
  },
  {
    icon: Target,
    label: "Avg. Deal Size",
    value: "$24K",
    sub: "Based on similar companies",
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },
  {
    icon: BarChart3,
    label: "Win Rate Estimate",
    value: "18%",
    sub: "With recommended strategy",
    iconBg: "bg-warning-soft",
    iconColor: "text-warning",
  },
];

export default function OpportunityMetrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center rounded-md size-8 ${metric.iconBg}`}>
              <metric.icon className={`size-3.5 ${metric.iconColor}`} />
            </div>
          </div>
          <div className="text-foreground font-headings font-semibold text-[20px] -tracking-[0.3px]">
            {metric.value}
          </div>
          <div className="text-muted-foreground text-[11px] mt-0.5">
            {metric.label}
          </div>
          <div className="text-muted-foreground text-[11px] mt-0.5">
            {metric.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
