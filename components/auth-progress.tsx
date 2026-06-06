"use client";

interface AuthProgressProps {
  steps: string[];
  current: number;
}

export default function AuthProgress({ steps, current }: AuthProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div
              className={`size-2 rounded-full transition-colors ${
                i <= current ? "bg-primary" : "bg-border"
              }`}
            />
            <span
              className={`text-[12px] transition-colors ${
                i === current
                  ? "text-foreground font-medium"
                  : i < current
                    ? "text-primary"
                    : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 h-px transition-colors ${
                i < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
