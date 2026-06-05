import type { LucideIcon } from "lucide-react";

interface InvestigationCardProps {
  company: string;
  description: string;
  time: string;
  leads: number;
  insights: number;
  icon: LucideIcon;
}

export default function InvestigationCard({
  company,
  description,
  time,
  leads,
  insights,
  icon: Icon,
}: InvestigationCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-card border border-border rounded-lg p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md bg-muted border border-border size-9">
            <Icon className="size-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-foreground text-[13px] font-medium">
              {company}
            </div>
            <div className="text-muted-foreground text-[12px]">
              {description}
            </div>
          </div>
        </div>
        <span className="text-muted-foreground text-[12px] flex-shrink-0">
          {time}
        </span>
      </div>
      <div className="flex items-center gap-4 pt-1 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </span>
          <span className="text-foreground text-[12px] font-medium">
            {leads.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-[12px]">leads</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4" />
              <path d="M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
          </span>
          <span className="text-foreground text-[12px] font-medium">
            {insights}
          </span>
          <span className="text-muted-foreground text-[12px]">AI insights</span>
        </div>
      </div>
    </div>
  );
}
