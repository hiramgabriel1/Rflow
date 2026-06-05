import type { LucideIcon } from "lucide-react";
import { Play, Clock, CheckCircle2 } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  lessons: number;
  duration: string;
  level: string;
  progress: number;
  completed: boolean;
  featured?: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const levelColors: Record<string, string> = {
  Beginner: "bg-success-soft text-success",
  Intermediate: "bg-info-soft text-info",
  Advanced: "bg-warning-soft text-warning",
};

export default function CourseCard({
  title,
  description,
  category,
  lessons,
  duration,
  level,
  progress,
  completed,
  featured,
  icon: Icon,
  iconBg,
  iconColor,
}: CourseCardProps) {
  return (
    <div
      className={`bg-card border rounded-lg overflow-hidden group cursor-pointer ${
        featured ? "border-border shadow-[0_1px_4px_rgba(0,0,0,0.04)]" : "border-border"
      }`}
    >
      <div className={`relative h-32 ${featured ? "bg-gradient-to-br from-secondary to-muted" : "bg-muted"} flex items-center justify-center`}>
        <div className={`flex items-center justify-center rounded-lg size-12 ${iconBg}`}>
          <Icon className={`size-6 ${iconColor}`} />
        </div>
        {completed && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground rounded-full size-6 flex items-center justify-center">
            <CheckCircle2 className="size-3.5" />
          </div>
        )}
        {progress > 0 && !completed && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <div className="bg-primary/90 rounded-full size-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="size-4 text-primary-foreground ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-muted-foreground text-[11px] font-medium">
            {category}
          </span>
          <span className="text-muted-foreground text-[11px]">·</span>
          <span className={`text-[11px] font-medium rounded-full px-1.5 py-0.5 ${levelColors[level]}`}>
            {level}
          </span>
        </div>
        <h3 className="text-foreground font-medium text-[14px] mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-muted-foreground text-[12px] leading-[1.5] line-clamp-2 mb-3">
          {description}
        </p>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Play className="size-3" />
              {lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {duration}
            </span>
          </div>
          {progress > 0 && !completed && (
            <span className="text-primary font-medium">{progress}%</span>
          )}
        </div>
      </div>
    </div>
  );
}
