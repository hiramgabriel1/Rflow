import type { LucideIcon } from "lucide-react";

interface OpportunityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  tag: string;
  tagClass: string;
  iconBgClass: string;
  iconColorClass: string;
}

export default function OpportunityItem({
  icon: Icon,
  title,
  description,
  time,
  tag,
  tagClass,
  iconBgClass,
  iconColorClass,
}: OpportunityItemProps) {
  return (
    <div className="flex items-start gap-3.5 py-4 border-b border-border last:border-b-0">
      <div
        className={`flex items-center justify-center rounded-md flex-shrink-0 size-[34px] ${iconBgClass}`}
      >
        <Icon className={`size-3.5 ${iconColorClass}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span className="text-foreground text-[13px] font-medium">
            {title}
          </span>
          <span
            className={`flex-shrink-0 text-xs rounded-full px-2 py-0.5 font-medium ${tagClass}`}
          >
            {tag}
          </span>
        </div>
        <div className="text-muted-foreground text-[12px] mt-0.5">
          {description}
        </div>
      </div>
      <span className="text-muted-foreground text-[11px] flex-shrink-0">
        {time}
      </span>
    </div>
  );
}
