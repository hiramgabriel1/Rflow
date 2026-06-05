const data = [
  { day: "M", height: 38 },
  { day: "T", height: 55 },
  { day: "W", height: 42 },
  { day: "T", height: 70 },
  { day: "F", height: 60 },
  { day: "S", height: 85, highlight: true },
  { day: "S", height: 74 },
];

export default function ActivityChart() {
  return (
    <div className="flex-shrink-0 border border-border rounded-lg p-4 bg-card shadow-[0_1px_4px_rgba(0,0,0,0.04)] w-[240px]">
      <div className="text-muted-foreground text-[12px] mb-3">
        Activity this week
      </div>
      <div className="flex items-end gap-1.5 h-14">
        {data.map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${bar.height}%`,
              background: bar.highlight ? "var(--color-primary)" : "#ebebeb",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {data.map((bar, i) => (
          <span
            key={i}
            className="text-muted-foreground flex-1 text-center text-[10px]"
          >
            {bar.day}
          </span>
        ))}
      </div>
    </div>
  );
}
