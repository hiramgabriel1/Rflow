import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface LearningPathProps {
  title: string;
  description: string;
  courses: string[];
  icon: LucideIcon;
}

export default function LearningPath({
  title,
  description,
  courses,
  icon: Icon,
}: LearningPathProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 group cursor-pointer hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center bg-secondary rounded-md size-9">
          <Icon className="size-4 text-primary" />
        </div>
        <div>
          <h3 className="text-foreground font-medium text-[14px]">{title}</h3>
          <p className="text-muted-foreground text-[12px]">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mb-4">
        {courses.map((course, i) => (
          <div key={i} className="flex items-center gap-2 text-[12px] text-foreground">
            <div className="size-4 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-muted-foreground text-[10px] font-medium">
                {i + 1}
              </span>
            </div>
            <span className="truncate">{course}</span>
          </div>
        ))}
      </div>
      <button className="flex items-center gap-1 text-primary text-[12px] font-medium group-hover:gap-2 transition-all">
        Start path
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}
