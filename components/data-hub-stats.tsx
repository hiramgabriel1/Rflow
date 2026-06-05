import { Users, Mail, Phone, Building2, BarChart3 } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "48,320",
    label: "Total Leads",
    sub: "+1,240 this week",
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
  {
    icon: Mail,
    value: "31,084",
    label: "Verified Emails",
    sub: "64% verified",
    iconBg: "bg-success-soft",
    iconColor: "text-success",
  },
  {
    icon: Phone,
    value: "18,942",
    label: "Phone Numbers",
    sub: "39% coverage",
    iconBg: "bg-info-soft",
    iconColor: "text-info",
  },
  {
    icon: Building2,
    value: "7,210",
    label: "Companies",
    sub: "312 industries",
    iconBg: "bg-warning-soft",
    iconColor: "text-warning",
  },
  {
    icon: BarChart3,
    value: "74 / 100",
    label: "Avg. Lead Score",
    sub: "+3 pts vs last month",
    iconBg: "bg-secondary",
    iconColor: "text-primary",
  },
];

export default function DataHubStats() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-lg p-5"
        >
          <div className={`flex items-center justify-center rounded-md size-9 ${stat.iconBg} mb-3`}>
            <stat.icon className={`size-4 ${stat.iconColor}`} />
          </div>
          <div className="text-foreground font-headings font-semibold text-[22px] -tracking-[0.3px]">
            {stat.value}
          </div>
          <div className="text-muted-foreground text-[12px] mt-0.5">
            {stat.label}
          </div>
          <div className="text-muted-foreground text-[11px] mt-0.5">
            {stat.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
